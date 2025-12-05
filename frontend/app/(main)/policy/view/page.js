'use server';
import { cookies } from 'next/headers';
import DefaultLayout from '@/app/components/layout/DefaultLayout'
import ViewTable from '@/app/components/policy/ViewTable';
import ProtectedRoute from '@/app/components/ProtectedRoute';

async function fetchTasks(token) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error('Error fetching tasks:', res.status, errorBody);
        throw new Error('Failed to fetch task data');
    }

    const tasks = await res.json()
    return tasks;
    
}

async function fetchUsers(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users?role=volunteer`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error('Error fetching user:', res.status, errorBody);
        throw new Error('Failed to fetch user data');
    }

    return res.json();
}
const page = async ({ searchParams }) => {
    const page = parseInt(searchParams?.page || '1');
    const token = cookies().get('auth_token')?.value;
    const tasks = await fetchTasks(token);
    const users = await fetchUsers(token);
    

    
    return (
        <DefaultLayout title='All Tasks'>
            <ProtectedRoute permissions={['view-policies']}>
                <ViewTable data={tasks.data} users={users.data} title='Task' />
            </ProtectedRoute>
        </DefaultLayout>
    )
}

export default page