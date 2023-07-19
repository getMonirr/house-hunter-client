import { useState } from "react";
import { menu } from "../../../Constant/menu";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const Header = () => {
  const { user, setUser } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // handle log out
  const handleLogOut = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/logout/${user?.email}`)
      .then((res) => {
        if (res?.data?.isLogout) {
          Swal.fire("LogOut successful", "See you soon", "success");

          // remove token
          localStorage.removeItem("hunter_token");

          // set user
          setUser(null);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(err);
      });
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "white", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              House Hunter
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {menu.map(({ text, path }) => (
                <MenuItem key={text} onClick={handleCloseNavMenu}>
                  <Link to={path}>
                    <Typography textAlign="center" color="black">
                      {text}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            marginRight={1}
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link to="/">House Hunter</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {menu.map(({ text, path }) => (
              <Link key={text} to={path}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {text}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden lg:block">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.firstName}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </div>
                <Button onClick={handleLogOut} variant="contained" size="small">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="contained">Sign in</Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
