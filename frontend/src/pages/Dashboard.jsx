import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">CodVeda Dashboard</h1>
          <p className="text-sm text-gray-500">Logged in as: {role}</p>
        </div>
        <button
          onClick={logout}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <UserTable />
    </div>
  );
};

export default Dashboard;
