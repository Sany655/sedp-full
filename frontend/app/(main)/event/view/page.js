import { cookies } from 'next/headers';
import DefaultLayout from '@/app/components/layout/DefaultLayout'
import ProtectedRoute from '@/app/components/ProtectedRoute';
import ViewTable from '@/app/components/event/ViewTable';

async function fetchPolicies(token) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error('Error fetching polices:', res.status, errorBody);
        throw new Error('Failed to fetch policy data');
    }

    return res.json();
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
    const policy = await fetchPolicies(token);
    const users = await fetchUsers(token);

    return (
        <DefaultLayout title='All Event'>
            <ProtectedRoute permissions={['view-policies']}>
                <ViewTable data={policy.data} users={users.data} title='Event' />
            </ProtectedRoute>
        </DefaultLayout>
    )
}

export default page