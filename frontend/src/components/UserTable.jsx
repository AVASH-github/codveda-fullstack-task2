// src/components/UserTable.jsx
import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
import UserForm from "./UserForm";
import Modal from "react-modal";

Modal.setAppElement("#root"); // accessibility

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch {
      setError("Failed to delete user");
    }
  };

  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
    fetchUsers();
  };

  if (loading) return <p className="text-center mt-6 text-gray-700">Loading users...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mt-6 px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">CodVeda Users Dashboard</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-lg transition-colors duration-200"
          onClick={() => openModal()}
        >
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full">
          <thead className="bg-blue-100 text-blue-900 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-blue-50 transition-colors duration-200">
                <td className="py-2 px-4">{u.id}</td>
                <td className="py-2 px-4">{u.name}</td>
                <td className="py-2 px-4">{u.email}</td>
                <td className="py-2 px-4">{u.role}</td>
                <td className="py-2 px-4">{new Date(u.created_at).toLocaleString()}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => openModal(u)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition-colors duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-auto mt-16 shadow-2xl outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <UserForm
          editingUser={editingUser}
          onEditComplete={closeModal}
        />
      </Modal>
    </div>
  );
};

export default UserTable;
