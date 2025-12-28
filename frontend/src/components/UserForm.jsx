// src/components/UserForm.jsx
import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "../services/api";

const UserForm = ({ onUserAdded, editingUser, onEditComplete }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setRole(editingUser.role || "user");
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !email || (!editingUser && !password)) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      if (editingUser) {
        // Update user
        await updateUser(editingUser.id, { name, email, role });
        onEditComplete(); // signal update complete
      } else {
        // Add new user
        await addUser({ name, email, password, role });
        onUserAdded();
      }

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
    } catch (err) {
      setError("Failed to submit user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? "Update User" : "Add New User"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!editingUser && (
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : editingUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
