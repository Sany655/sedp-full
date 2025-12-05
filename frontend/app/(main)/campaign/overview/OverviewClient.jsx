"use client";

import { useEffect, useState } from "react";

const OverviewClient = () => {
    const [selectedCampaignType, setSelectedCampaignType] = useState("");
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [campaignTypes, setCampaignTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch campaign types
                const typesRes = await fetch("/api/campaign-types");
                if (!typesRes.ok) throw new Error("Failed to fetch campaign types");
                const typesData = await typesRes.json();
                console.log(typesData);

                if (typesData.success) {
                    setCampaignTypes(typesData.data);
                }

                // Fetch campaigns
                const campaignsRes = await fetch("/api/campaign-milestones");
                if (!campaignsRes.ok) throw new Error("Failed to fetch campaigns");
                const campaignsData = await campaignsRes.json();
                console.log(campaignsData);

                if (campaignsData.success) {
                    setCampaigns(campaignsData.data);
                    console.log(campaignsData.data);
                    setFilteredCampaigns(campaignsData.data);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCampaignType === "") {
            setFilteredCampaigns(campaigns);
        } else {
            setFilteredCampaigns(
                campaigns.filter((campaign) =>
                    campaign.typeId === selectedCampaignType
                )
            );
        }
    }, [campaigns, selectedCampaignType]);

    return (
        <div>
            <div className="p-4 bg-white shadow rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
                {loading && <p>Loading data...</p>}
                {error && <p className="text-red-500">Error: {error.message}</p>}
                {!loading && !error && (
                    <>
                        <div className="mb-4 flex items-center space-x-4">
                            <label htmlFor="campaignTypeFilter" className="font-medium">Filter by Type:</label>
                            <select
                                id="campaignTypeFilter"
                                className="border rounded-md px-3 py-2"
                                value={selectedCampaignType}
                                onChange={(e) => setSelectedCampaignType(e.target.value)}
                            >
                                <option value="">All Types</option>
                                {campaignTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <h3 className="text-lg font-medium">Total Campaigns</h3>
                                <p className="text-3xl font-bold">{filteredCampaigns.length}</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg shadow">
                                <h3 className="text-lg font-medium">Active Campaigns</h3>
                                <p className="text-3xl font-bold">{filteredCampaigns.filter(c => c.status === 'active').length}</p>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg shadow">
                                <h3 className="text-lg font-medium">Draft Campaigns</h3>
                                <p className="text-3xl font-bold">{filteredCampaigns.filter(c => c.status === 'draft').length}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg shadow h-64 flex items-center justify-center">
                                <p className="text-gray-500">Campaigns by Status (Graph Placeholder)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow h-64 flex items-center justify-center">
                                <p className="text-gray-500">Campaigns by Type (Graph Placeholder)</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OverviewClient;