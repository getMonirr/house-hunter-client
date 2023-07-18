import { Outlet } from "react-router-dom";
import HouseContainer from "../../components/shared/HouseContainer";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <HouseContainer>
        <div className="flex">
          <div className="w-52 bg-red-200">
            <Sidebar />
          </div>
          <div className="flex-1 bg-green-400 p-8">
            <Outlet />
          </div>
        </div>
      </HouseContainer>
    </div>
  );
};

export default Dashboard;
