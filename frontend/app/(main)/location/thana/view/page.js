import { cookies } from 'next/headers';
import DefaultLayout from '@/app/components/layout/DefaultLayout'
import ViewTable from '@/app/components/area/ViewTable';
import ProtectedRoute from '@/app/components/ProtectedRoute';


async function fetchAreas(token) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/areas`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error('Error fetching roles:', res.status, errorBody);
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

async function fetchLocations(token) {


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/locations`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error('Error fetching roles:', res.status, errorBody);
        throw new Error('Failed to fetch data');
    }

    return res.json();
}


const page = async ({ searchParams }) => {
    const page = parseInt(searchParams?.page || '1');
    const token = cookies().get('auth_token')?.value;
    const data = await fetchAreas(token);
    const locations = await fetchLocations(token);

    return (
        <DefaultLayout title='All Areas'>
            <ProtectedRoute permissions={['view-areas']}>
                <ViewTable data={data} token={token} locations={locations.data} />
            </ProtectedRoute>
        </DefaultLayout>
    )
}

export default page