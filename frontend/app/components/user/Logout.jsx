"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/app/context/auth_context";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuthContext();
  const handleLogout = async () => {
 

    try {
      const response = await fetch("/api/logout", { method: "POST" });

      if (response.ok) {
        await logout(); 
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
  
    }
  };

  return (
    <Button
      variant="destructive"
      className="w-full mt-6"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
