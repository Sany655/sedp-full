"use client";
import React, { useState } from "react";
import { FaCalendarCheck, FaPlus, FaEdit, FaTrash, FaList, FaStream } from "react-icons/fa";
import MilestoneAddModal from "@/app/components/campaign-roadmap/MilestoneAddModal";
import MilestoneEditModal from "@/app/components/campaign-roadmap/MilestoneEditModal";
import RoadmapGanttView from "@/app/components/campaign-roadmap/RoadmapGanttView";
import TimelineItem from "@/app/components/campaign-roadmap/TimelineItem";
import toast from "react-hot-toast";
import useConfirmDelete from "@/app/hooks/useConfirmDelete";



const RoadmapClient = ({ initialData }) => {
    const [milestones, setMilestones] = useState(initialData);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editModalData, setEditModalData] = useState(null);
    const [viewMode, setViewMode] = useState("list"); // 'list' or 'gantt'
    const { confirmDelete } = useConfirmDelete();

    const sortedData = [...milestones].sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );

    const handleAddMilestone = async (data) => {
        try {
            const res = await fetch("/api/campaign-milestones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                setMilestones((prev) => [...prev, result.data]);
                toast.success("Milestone added successfully");
            } else {
                toast.error(result.msg || "Failed to add milestone");
            }
        } catch (error) {
            console.error("Error adding milestone:", error);
            toast.error("Something went wrong");
        }
    };

    const handleUpdateMilestone = async (data) => {
        try {
            const res = await fetch(`/api/campaign-milestones/${data.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                setMilestones((prev) =>
                    prev.map((item) => (item.id === data.id ? result.data : item))
                );
                toast.success("Milestone updated successfully");
            } else {
                toast.error(result.msg || "Failed to update milestone");
            }
        } catch (error) {
            console.error("Error updating milestone:", error);
            toast.error("Something went wrong");
        }
    };

    const handleDeleteMilestone = async (id) => {
        try {
            const res = await fetch(`/api/campaign-milestones/${id}`, {
                method: "DELETE",
            });

            const result = await res.json();

            if (res.ok) {
                setMilestones((prev) => prev.filter((item) => item.id !== id));
                toast.success("Milestone deleted successfully");
            } else {
                toast.error(result.msg || "Failed to delete milestone");
            }
        } catch (error) {
            console.error("Error deleting milestone:", error);
            toast.error("Something went wrong");
        }
    };

    const confirmDeleteHandler = (milestone) => {
        confirmDelete({
            itemName: milestone.title,
            onDelete: () => handleDeleteMilestone(milestone.id),
            onSuccess: () => { },
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="mx-auto">
                <div className="flex justify-between items-center mb-16">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Campaign Roadmap</h1>
                        <p className="mt-2 text-gray-600">Track your campaign milestones and deadlines</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-200 flex">
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-blue-50 text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                                title="List View"
                            >
                                <FaList />
                            </button>
                            <button
                                onClick={() => setViewMode("gantt")}
                                className={`p-2 rounded-md transition-all ${viewMode === "gantt" ? "bg-blue-50 text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                                title="Gantt View"
                            >
                                <FaStream />
                            </button>
                        </div>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                        >
                            <FaPlus />
                            Add Milestone
                        </button>
                    </div>
                </div>

                {viewMode === "gantt" ? (
                    <RoadmapGanttView milestones={sortedData} />
                ) : (
                    sortedData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-slate-200">
                            <div className="p-4 bg-blue-50 rounded-full mb-4">
                                <FaCalendarCheck className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">No milestones yet</h3>
                            <p className="text-slate-500 mb-6">Start planning your campaign by adding your first milestone.</p>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                + Create Milestone
                            </button>
                        </div>
                    ) : (
                        <div className="relative py-8 px-4 sm:px-12 max-w-5xl mx-auto">
                            <div className="flex flex-col">
                                {sortedData.map((item, index) => (
                                    <TimelineItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        isLast={index === sortedData.length - 1}
                                        onEdit={setEditModalData}
                                        onDelete={confirmDeleteHandler}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
            </div>

            <MilestoneAddModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddMilestone}
            />

            <MilestoneEditModal
                isOpen={!!editModalData}
                onClose={() => setEditModalData(null)}
                milestone={editModalData}
                onSubmit={handleUpdateMilestone}
            />
        </div>
    )
}
export default RoadmapClient;
