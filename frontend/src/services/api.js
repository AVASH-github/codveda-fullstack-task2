const API_URL = "http://localhost:5000/api/users";

const getTokenHeaders = () => {
  const token = localStorage.getItem("token");
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
};

// GET all users
export const getUsers = async () => {
  const res = await fetch(API_URL, { headers: getTokenHeaders() });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

// DELETE a user
export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: getTokenHeaders() });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
};

// POST new user
export const addUser = async (user) => {
  const res = await fetch(API_URL, { method: "POST", headers: getTokenHeaders(), body: JSON.stringify(user) });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
};

// PUT update user
export const updateUser = async (id, user) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "PUT", headers: getTokenHeaders(), body: JSON.stringify(user) });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};

// Login
export const loginUser = async ({ email, password }) => {
  const res = await fetch("http://localhost:5000/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};
