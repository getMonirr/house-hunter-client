import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex items-center justify-center p-8 border-b">
        <h3 className="text-3xl font-bold">
          {user?.role === "owner"
            ? "House Owner Dashboard"
            : "Renter Dashboard"}
        </h3>
      </div>
      <div className="flex">
        <div className="w-52 min-h-[calc(100vh-100px)] flex flex-col justify-between items-center py-4">
          <div>logo</div>
          <Sidebar />
          <div>footer</div>
        </div>
        <div className="flex-1 bg-gray-300 p-8 min-h-[calc(100vh-100px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
