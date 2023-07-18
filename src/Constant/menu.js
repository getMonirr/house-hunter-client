import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

export const menu = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/dashboard",
    text: "Dashboard",
  },
];

export const dashboard = [
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
