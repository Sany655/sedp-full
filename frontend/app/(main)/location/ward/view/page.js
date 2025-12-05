import { cookies } from 'next/headers';
import DefaultLayout from '@/app/components/layout/DefaultLayout'
import ProtectedRoute from '@/app/components/ProtectedRoute';
import ViewTable from '@/app/components/territory/ViewTable';


async function fetchTerritories(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/territories`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch territories')
    }

    return res.json()
}

async function fetchAreas(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/areas`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch area')
    }

    return res.json()
}


const page = async ({ searchParams }) => {
    const token = cookies().get('auth_token')?.value;
    const page = parseInt(searchParams?.page || '1');
    const data = await fetchTerritories(token);
    const areas = await fetchAreas(token);

    return (
        <DefaultLayout title='All Territory'>
            <ProtectedRoute permissions={['view-territories']}>
                <ViewTable data={data} areas={areas.data} />
            </ProtectedRoute>
        </DefaultLayout>
    )
}

export default page