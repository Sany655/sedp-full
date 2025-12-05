import { cookies } from 'next/headers';
import DefaultLayout from '@/app/components/layout/DefaultLayout'
import ViewTable from '@/app/components/region/ViewTable';
import ProtectedRoute from '@/app/components/ProtectedRoute';


async function fetchLocations(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/locations`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

async function fetchTeams(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teams`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch team')
    }

    return res.json()
}


const page = async ({ searchParams }) => {
    const token = cookies().get('auth_token')?.value;
    const page = parseInt(searchParams?.page || '1');
    const data = await fetchLocations(token);
    const teams = await fetchTeams(token);

    return (
        <DefaultLayout title='All District'>
            <ProtectedRoute permissions={['view-regions']}>
                <ViewTable data={data} token={token} teams={teams.data} title='District' />
            </ProtectedRoute>
        </DefaultLayout>
    )
}

export default page