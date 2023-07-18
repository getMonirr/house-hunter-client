import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Dashboard from "../layouts/Dashboard/Dashboard";
import ListedHouses from "../layouts/Dashboard/HouseOwner/ListedHouses";
import BookingsHouse from "../layouts/Dashboard/HouseOwner/BookingsHouse";
import AddNewHouse from "../layouts/Dashboard/AddNewHouse/AddNewHouse";
import PrivateRoutes from "./PrivateRoutes";
import RenterBookings from "../layouts/Dashboard/RenterHouse/RenterBookings";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "registration",
    element: <Registration />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "listed-house",
        element: <ListedHouses />,
      },
      {
        path: "bookings",
        element: <BookingsHouse />,
      },
      {
        path: "add-new-house",
        element: <AddNewHouse />,
      },
      {
        path: "renter-bookings",
        element: <RenterBookings />,
      },
    ],
  },
]);

export default Routers;
