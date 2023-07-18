import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header/Header";

const Main = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <div>Footer</div>
    </div>
  );
};

export default Main;
