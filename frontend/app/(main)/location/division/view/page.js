import { cookies } from 'next/headers';
import DefaultLayout from '@/app/components/layout/DefaultLayout'
import ProtectedRoute from '@/app/components/ProtectedRoute';
import ViewTable from '@/app/components/team/ViewTable';


async function fetchTeams(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teams`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch team data')
    }

    return res.json()
}


const page = async ({ searchParams }) => {
    const token = cookies().get('auth_token')?.value;
    const page = parseInt(searchParams?.page || '1');
    const data = await fetchTeams(token);

    return (
        <DefaultLayout title='Division'>
            <ProtectedRoute permissions={['view-teams']}>
                <ViewTable data={data} token={token} title='Division' />
            </ProtectedRoute>
        </DefaultLayout>
    )
}

export default page