import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UserTable from "./components/UserTable";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={token ? <UserTable /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;

