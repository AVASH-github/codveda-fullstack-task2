const API_URL = "http://localhost:5000/api/users";

// GET all users
export const getUsers = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// DELETE a user
export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete");
  return res.json();
};

// POST a new user
export const addUser = async (user) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
};
// PUT update user
export const updateUser = async (id, user) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};
