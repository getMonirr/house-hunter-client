import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import useAuth from "../../hooks/useAuth";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import HouseboatIcon from "@mui/icons-material/Houseboat";

const Dashboard = () => {
  const { user } = useAuth();

  const [isMenuShow, setIsMenuShow] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-center p-8 border-b bg-blue-500">
        <h3 className=" text-xl lg:text-3xl font-bold text-white">
          {user?.role === "owner"
            ? "House Owner Dashboard"
            : "Renter Dashboard"}
        </h3>
      </div>
      <div className="flex">
        <div className={` lg:block ${isMenuShow ? "block" : "hidden"}`}>
          <div className="w-52 min-h-[calc(100vh-100px)] flex flex-col justify-between items-center py-4">
            <div className="flex flex-col items-center justify-center">
              <Link to="/">
                <IconButton>
                  <HouseboatIcon sx={{ fontSize: 80 }} />
                </IconButton>
              </Link>
                <h3 className="text-base uppercase font-bold">House Hunter</h3>
            </div>
            <Sidebar />
            <div>
              <h3 className="text-[10px]"> © 2023 - House Hunter | All Right Reserve</h3>
            </div>
          </div>
        </div>
        <div className="absolute lg:hidden">
          <IconButton onClick={() => setIsMenuShow(!isMenuShow)}>
            {isMenuShow ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        <div className="flex-1 bg-gray-300 py-8 lg:p-8 min-h-[calc(100vh-100px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
