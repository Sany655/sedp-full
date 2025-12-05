'use client'

import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userInfo')) : null);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setRoles(parsed?.roles || []);
      setPermissions(parsed?.roles[0]?.permissions || []);
    }
  }, []);

  const login = async (form) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: form.get('email'),
          password: form.get('password'),
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (res.ok) {
        if (data) {
          localStorage.setItem('token', JSON.stringify(data.token));
          localStorage.setItem('userInfo', JSON.stringify(data.data));
          
          // Update state
          setUser(data.data);
          setRoles(data.data?.roles || []);
          setPermissions(data.data?.roles[0]?.permissions || []);
          
          // Check permission directly from the response data (not from state)
          const userHasManualAttendancePermission = data.data?.roles?.some(role =>
            role.permissions?.some(perm => perm.name === 'take-manual-attendance')
          );
          
          // Redirect based on permission
          if (userHasManualAttendancePermission) {
            router.push('/attendance/manual');
          } else {
            router.push('/');
          }
        }
      } else {
        setError(data.msg || 'Invalid email or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUser(null);
    setRoles([]);
    setPermissions([]);
    router.push('/');
    return true;
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return user.roles?.some(role =>
      role.permissions?.some(perm => perm.name === permission)
    );
  };

  const hasRole = (role) => {
    if (!user) return false;
    return user.roles?.some(userRole => userRole.name === role);
  };

  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAnyRole = (roles) => {
    return roles.some(role => hasRole(role));
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login,
      logout,
      isLoading,
      isError,
      permissions,
      hasRole,
      hasPermission,
      hasAnyRole,
      hasAnyPermission,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}