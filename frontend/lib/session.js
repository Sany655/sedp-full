import { cookies } from 'next/headers';

export async function getSessionUser(token) {
  if (!token) return null;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) return null;

  const user = await res.json();

  return user;
}
