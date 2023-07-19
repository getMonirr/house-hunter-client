import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header/Header";

const Main = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <div className="py-16 mt-16 bg-gray-600">
      <h3 className="text-xs lg:text-lg text-center text-white"> © 2023 - House Hunter | All Right Reserve</h3>
      </div>
    </div>
  );
};

export default Main;
