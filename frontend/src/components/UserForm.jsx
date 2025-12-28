// src/components/UserForm.jsx
import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "../services/api";

const UserForm = ({ editingUser, onEditComplete }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User"); // default to User
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name || "");
      setEmail(editingUser.email || "");
      setRole(editingUser.role || "User");
    } else {
      setName("");
      setEmail("");
      setRole("User");
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingUser) {
        await updateUser(editingUser.id, { name, email, role });
      } else {
        await addUser({ name, email, role });
      }
      onEditComplete();
    } catch (err) {
      setError("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        {editingUser ? "Edit User" : "Add New User"}
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-xl px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-xl px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Role Dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded-xl px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onEditComplete}
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 rounded-xl font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
