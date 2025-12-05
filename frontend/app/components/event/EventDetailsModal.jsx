"use client";
"use client";
import { BASE_URL_FOR_CLIENT } from "@/app/utils/constants";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const EventDetailsModal = ({ isOpen, onClose, onSubmit, event, title }) => {
  const [formData, setFormData] = useState({
    name: "",
    objective: "",
    type_id: "",
    status: "0",
    visibility: "0",
    target_group_id: "",
    created_by: "",
    organized_by: "",
    capacity: "",
    est_budget: "",
    est_spending: "",
    volunteer_team_id: "",
    location: "",
    division_id: "",
    district_id: "",
    thana_id: "",
    ward_id: "",
    union_id: "",
    expected_start_datetime: "",
    expected_end_datetime: "",
    actual_start_datetime: "",
    actual_end_datetime: "",
  });

  // Dummy data for dropdowns
  const eventTypes = [
    { id: 1, name: "Conference" },
    { id: 2, name: "Community Service" },
    { id: 3, name: "Workshop" },
    { id: 4, name: "Fundraiser" },
    { id: 5, name: "Social Gathering" },
  ];

  const targetGroups = [
    { id: 1, name: "General Public" },
    { id: 2, name: "Students" },
    { id: 3, name: "Professionals" },
    { id: 4, name: "Seniors" },
    { id: 5, name: "Youth" },
  ];

  const organizers = [
    { id: 1, name: "Main Office" },
    { id: 2, name: "Community Branch" },
    { id: 3, name: "Partner Organization" },
  ];

  const volunteerTeams = [
    { id: 1, name: "Team Alpha" },
    { id: 2, name: "Team Beta" },
    { id: 3, name: "Team Gamma" },
  ];

  const divisions = [
    { id: 30, name: "Dhaka" },
    { id: 31, name: "Chittagong" },
    { id: 32, name: "Rajshahi" },
    { id: 33, name: "Khulna" },
  ];

  const districts = [
    { id: 47, name: "Dhaka District", division_id: 30 },
    { id: 48, name: "Gazipur", division_id: 30 },
    { id: 49, name: "Narayanganj", division_id: 30 },
  ];

  const thanas = [
    { id: 12, name: "Uttara", district_id: 47 },
    { id: 13, name: "Mirpur", district_id: 47 },
    { id: 14, name: "Gulshan", district_id: 47 },
  ];

  const wards = [
    { id: 7, name: "Ward 7", thana_id: 12 },
    { id: 8, name: "Ward 8", thana_id: 12 },
    { id: 9, name: "Ward 9", thana_id: 12 },
  ];

  const unions = [
    { id: 3, name: "Union 3", ward_id: 7 },
    { id: 4, name: "Union 4", ward_id: 7 },
  ];

  // Helper function to format datetime for input
  const formatDateTimeForInput = (datetime) => {
    if (!datetime) return "";
    // Convert "2025-12-15T09:00:00" or ISO format to "YYYY-MM-DDTHH:mm"
    return datetime.slice(0, 16);
  };

  // Populate form data when editing an existing event
  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || "",
        objective: event.objective || "",
        type_id: event.type_id?.toString() || "",
        status: event.status?.toString() || "0",
        visibility: event.visibility?.toString() || "0",
        target_group_id: event.target_group_id?.toString() || "",
        created_by: event.created_by?.toString() || "",
        organized_by: event.organized_by?.toString() || "",
        capacity: event.capacity?.toString() || "",
        est_budget: event.est_budget?.toString() || "",
        est_spending: event.est_spending?.toString() || "",
        volunteer_team_id: event.volunteer_team_id?.toString() || "",
        location: event.location || "",
        division_id: event.division_id?.toString() || "",
        district_id: event.district_id?.toString() || "",
        thana_id: event.thana_id?.toString() || "",
        ward_id: event.ward_id?.toString() || "",
        union_id: event.union_id?.toString() || "",
        expected_start_datetime: formatDateTimeForInput(
          event.expected_start_datetime
        ),
        expected_end_datetime: formatDateTimeForInput(
          event.expected_end_datetime
        ),
        actual_start_datetime: formatDateTimeForInput(
          event.actual_start_datetime
        ),
        actual_end_datetime: formatDateTimeForInput(event.actual_end_datetime),
      });
    }
  }, [event]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.trim()) {
      const jsonData = {
        id: event.id, // Include event ID for update
        name: formData.name.trim(),
        objective: formData.objective.trim(),
        type_id: parseInt(formData.type_id),
        status: parseInt(formData.status),
        visibility: parseInt(formData.visibility),
        target_group_id: parseInt(formData.target_group_id),
        created_by: parseInt(formData.created_by),
        organized_by: parseInt(formData.organized_by),
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        est_budget: formData.est_budget ? parseFloat(formData.est_budget) : null,
        est_spending: formData.est_spending
          ? parseFloat(formData.est_spending)
          : null,
        volunteer_team_id: formData.volunteer_team_id
          ? parseInt(formData.volunteer_team_id)
          : null,
        location: formData.location.trim(),
        division_id: parseInt(formData.division_id),
        district_id: parseInt(formData.district_id),
        thana_id: parseInt(formData.thana_id),
        ward_id: formData.ward_id ? parseInt(formData.ward_id) : null,
        union_id: formData.union_id ? parseInt(formData.union_id) : null,
        expected_start_datetime: formData.expected_start_datetime,
        expected_end_datetime: formData.expected_end_datetime,
        actual_start_datetime: formData.actual_start_datetime || null,
        actual_end_datetime: formData.actual_end_datetime || null,
      };

      console.log("Event Update Data:", jsonData);
      onSubmit(jsonData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-900">
            {title} Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Event Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event name"
                  disabled
                />
              </div>

              {/* Objective */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objective *
                </label>
                <textarea
                  value={formData.objective}
                  onChange={(e) =>
                    handleInputChange("objective", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event objective"
                  rows={3}
                  disabled
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  value={formData.type_id}
                  onChange={(e) => handleInputChange("type_id", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Group *
                </label>
                <select
                  value={formData.target_group_id}
                  onChange={(e) =>
                    handleInputChange("target_group_id", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select target group</option>
                  {targetGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="0">Draft</option>
                  <option value="1">Planned</option>
                  <option value="2">Ongoing</option>
                  <option value="3">Completed</option>
                  <option value="4">Cancelled</option>
                </select>
              </div>

              {/* Visibility */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visibility *
                </label>
                <select
                  value={formData.visibility}
                  onChange={(e) =>
                    handleInputChange("visibility", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="0">Private</option>
                  <option value="1">Public</option>
                  <option value="2">Members Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Organization Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Organization Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Organized By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organized By *
                </label>
                <select
                  value={formData.organized_by}
                  onChange={(e) =>
                    handleInputChange("organized_by", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select organizer</option>
                  {organizers.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Volunteer Team */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volunteer Team
                </label>
                <select
                  value={formData.volunteer_team_id}
                  onChange={(e) =>
                    handleInputChange("volunteer_team_id", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select volunteer team</option>
                  {volunteerTeams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Created By (User ID) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Created By (User ID) *
                </label>
                <input
                  type="number"
                  value={formData.created_by}
                  onChange={(e) =>
                    handleInputChange("created_by", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter user ID"
                  required
                />
              </div>

              {/* Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    handleInputChange("capacity", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Maximum attendees"
                />
              </div>
            </div>
          </div>

          {/* Budget Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Budget Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Estimated Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Budget (৳)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.est_budget}
                  onChange={(e) =>
                    handleInputChange("est_budget", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              {/* Estimated Spending */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Spending (৳)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.est_spending}
                  onChange={(e) =>
                    handleInputChange("est_spending", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Location Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Address *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full address"
                  required
                />
              </div>

              {/* Division */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Division *
                </label>
                <select
                  value={formData.division_id}
                  onChange={(e) =>
                    handleInputChange("division_id", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select division</option>
                  {divisions.map((div) => (
                    <option key={div.id} value={div.id}>
                      {div.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District *
                </label>
                <select
                  value={formData.district_id}
                  onChange={(e) =>
                    handleInputChange("district_id", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select district</option>
                  {districts.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Thana */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thana *
                </label>
                <select
                  value={formData.thana_id}
                  onChange={(e) =>
                    handleInputChange("thana_id", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select thana</option>
                  {thanas.map((thana) => (
                    <option key={thana.id} value={thana.id}>
                      {thana.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ward */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ward
                </label>
                <select
                  value={formData.ward_id}
                  onChange={(e) =>
                    handleInputChange("ward_id", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select ward</option>
                  {wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Union */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Union
                </label>
                <select
                  value={formData.union_id}
                  onChange={(e) =>
                    handleInputChange("union_id", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select union</option>
                  {unions.map((union) => (
                    <option key={union.id} value={union.id}>
                      {union.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Schedule Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Expected Start */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.expected_start_datetime}
                  onChange={(e) =>
                    handleInputChange("expected_start_datetime", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Expected End */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected End Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.expected_end_datetime}
                  onChange={(e) =>
                    handleInputChange("expected_end_datetime", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Actual Start */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Actual Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.actual_start_datetime}
                  onChange={(e) =>
                    handleInputChange("actual_start_datetime", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Actual End */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Actual End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.actual_end_datetime}
                  onChange={(e) =>
                    handleInputChange("actual_end_datetime", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventDetailsModal;