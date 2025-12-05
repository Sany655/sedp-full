"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const TeamAddModal = ({ isOpen, onClose, onSubmit, title }) => {
  const [formData, setFormData] = useState({
    team_name: "",
  });

  const allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleInputChange = (field, value) => {
    if (field === "work_start_time" || field === "work_end_time") {
      const [hour, minute] = value.split(":");
      value = `${hour}:${minute}:00`;
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDayToggle = (day, type) => {
    setFormData((prev) => {
      const currentList = prev[type];
      const otherType = type === "working_days" ? "off_days" : "working_days";
      const otherList = prev[otherType];

      if (currentList.includes(day)) {
        // Remove from current list
        return {
          ...prev,
          [type]: currentList.filter((d) => d !== day),
        };
      } else {
        // Add to current list and remove from other list
        return {
          ...prev,
          [type]: [...currentList, day],
          [otherType]: otherList.filter((d) => d !== day),
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.team_name.trim()) {
      const jsonData = {
        team_name: formData.team_name.trim(),
      };

      onSubmit(jsonData);
      setFormData({
        team_name: "",
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Add New {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Policy Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {title} Name *
            </label>
            <input
              type="text"
              value={formData.team_name}
              onChange={(e) => handleInputChange("team_name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter ${title} name`}
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamAddModal;
