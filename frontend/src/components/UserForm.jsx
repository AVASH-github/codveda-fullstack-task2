// src/components/UserForm.jsx
import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "../services/api";

const UserForm = ({ editingUser, onEditComplete }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setRole(editingUser.role);
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
    }
    setError("");
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !email || (!editingUser && !password)) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      if (editingUser) {
        await updateUser(editingUser.id, { name, email, role });
      } else {
        await addUser({ name, email, password, role });
      }
      onEditComplete();
    } catch (err) {
      setError(err.message || "Failed to save user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold text-gray-800">
        {editingUser ? "Edit User" : "Add New User"}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <label className="font-medium">Name</label>
      <input
        type="text"
        className="border p-3 rounded w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label className="font-medium">Email</label>
      <input
        type="email"
        className="border p-3 rounded w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {!editingUser && (
        <>
          <label className="font-medium">Password</label>
          <input
            type="password"
            className="border p-3 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </>
      )}

      <label className="font-medium">Role</label>
      <select
        className="border p-3 rounded w-full"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition-colors duration-200"
      >
        {loading
          ? editingUser
            ? "Updating..."
            : "Adding..."
          : editingUser
          ? "Update User"
          : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;

