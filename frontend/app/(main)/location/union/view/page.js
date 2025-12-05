import { cookies } from 'next/headers';
import DefaultLayout from '@/app/components/layout/DefaultLayout'
import ProtectedRoute from '@/app/components/ProtectedRoute';
import ViewTable from '@/app/components/rff/ViewTable';


async function fetchRffpoints(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rff-points`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch rff')
    }

    return res.json()
}

async function fetchTerritory(token) {
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


const page = async ({ searchParams }) => {
    const token = cookies().get('auth_token')?.value;
    const page = parseInt(searchParams?.page || '1');
    const data = await fetchRffpoints(token);
    const territories = await fetchTerritory(token);

    return (
        <DefaultLayout title='Rff Points'>
            <ProtectedRoute permissions={['view-rffs']}>
                <ViewTable data={data} token={token} territories={territories.data} />
            </ProtectedRoute>
        </DefaultLayout>
    )
}

export default page