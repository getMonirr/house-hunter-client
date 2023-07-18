import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import useAuth from "../../../hooks/useAuth";

const ownerDashboard = [
  {
    path: "listed-house",
    text: "Listed Houses",
    icon: FormatListBulletedIcon,
  },
  {
    path: "bookings",
    text: "Bookings",
    icon: BookmarkAddedIcon,
  },
];
const renterDashboard = [
  {
    path: "renter-bookings",
    text: "Booking Houses",
    icon: FormatListBulletedIcon,
  },
];

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <nav aria-label="main mailbox folders">
      <List>
        {user?.role === "owner"
          ? ownerDashboard.map(({ path, text, icon: Icon }) => (
              <ListItem key={text} disablePadding>
                <NavLink to={path}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))
          : renterDashboard.map(({ path, text, icon: Icon }) => (
              <ListItem key={text} disablePadding>
                <NavLink to={path}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))}
      </List>
    </nav>
  );
};

export default Sidebar;
