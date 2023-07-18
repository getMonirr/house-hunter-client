import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { dashboard } from "../../../Constant/menu";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav aria-label="main mailbox folders">
      <List>
        {dashboard.map(({ path, text, icon: Icon }) => (
          <ListItem key={text} disablePadding>
            <Link to={path}>
              <ListItemButton>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </nav>
  );
};

export default Sidebar;
