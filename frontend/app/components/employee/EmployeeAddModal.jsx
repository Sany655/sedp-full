"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const EmployeeAddModal = ({
  isOpen,
  onClose,
  onSubmit,
  roles = [],
  policies = [],
  title
}) => {
  const [formData, setFormData] = useState({
    role: "9", //volunteer
    employee_id: "",
    attendence_policy_id: "",
    start_date: "",
    end_date: "",
    user_id: "",
    name: "",
    email: "",
    msisdn: "",
    password: "123456",
    status: true,
    avatar: null,
    avatarPreview: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          avatar: file,
          avatarPreview: URL.createObjectURL(file),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "avatarPreview" && value !== null && value !== "") {
        // Convert boolean to string for FormData
        if (typeof value === "boolean") {
          formDataToSend.append(key, value ? "1" : "0");
        } else {
          formDataToSend.append(key, value);
        }
      }
    });

    onSubmit(formDataToSend);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
               Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg cursor-pointer"
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Attendance Policy
            </label>
            <select
              name="attendence_policy_id"
              value={formData.attendence_policy_id}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg cursor-pointer"
              required
            >
              <option value="">Select policy</option>
              {policies.map((policy) => (
                <option key={policy.id} value={policy.id}>
                  {policy.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Policy's start date *
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Policy's end date *</p>
            </div>
          </div> */}

          {/* Text Fields */}
          {[
            {
              label: `${title} ID`,
              name: "employee_id",
              type: "text",
              placeholder: `Enter ${title} ID`,
              required: true,
            },
            {
              label: "Full Name",
              name: "name",
              type: "text",
              placeholder: "Enter Full Name",
              required: true,
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              placeholder: "Enter Email",
            },
            {
              label: "Mobile Number",
              name: "msisdn",
              type: "text",
              placeholder: "Enter Mobile Number",
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              placeholder: "Enter Password",
              required: true,
            },
          ].map(({ label, name, type, placeholder, required }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                className="w-full mt-1 p-2 border rounded-lg"
                placeholder={placeholder}
              />
            </div>
          ))}

          {/* Avatar Upload */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
              accept="image/*"
            />
            {formData.avatarPreview && (
              <img
                src={formData.avatarPreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div> */}

          {/* Status Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-700"
            >
              Active Status
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add {title}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeAddModal;
