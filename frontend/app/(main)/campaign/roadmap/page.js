import DefaultLayout from "@/app/components/layout/DefaultLayout";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { cookies } from 'next/headers';
import RoadmapClient from "./RoadmapClient";

async function fetchMilestones(token) {
    try {
        const res = await fetch(`/api/campaign-milestones`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!res.ok) {
            console.error('Error fetching milestones:', res.status);
            return { data: [] };
        }

        return await res.json();
    } catch (error) {
        console.error('Failed to fetch milestones:', error);
        return { data: [] };
    }
}

const RoadmapPage = async () => {
    const token = cookies().get('auth_token')?.value;
    const milestonesResponse = await fetchMilestones(token);
    const milestones = milestonesResponse.data || [];

    return (
        <DefaultLayout title='Campaign Roadmap'>
            <ProtectedRoute permissions={['view-policies']}>
                <RoadmapClient initialData={milestones} />
            </ProtectedRoute>
        </DefaultLayout>
    );
};

export default RoadmapPage;