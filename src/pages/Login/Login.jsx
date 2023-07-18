import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // use auth
  const { setUser } = useAuth();

  // navigate
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/users/login`, { ...data })
      .then((res) => {
        if (res.data?.isLogin) {
          const { newUser, token } = res.data;

          // save token in local storage
          localStorage.setItem("hunter_token", token);

          // set user
          setUser(newUser);

          Swal.fire("Login successful", "Welcome back to hunter", "success");

          // navigate user
          navigate(from);
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
    <div className="flex">
      <div
        className="flex-1 hidden lg:block min-h-screen object-fill object-center bg-no-repeat"
        style={{
          background: `url(https://source.unsplash.com/random?wallpapers)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center, center",
        }}
      ></div>
      <div className="w-1/3 flex justify-center px-16 py-32">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col items-center gap-3 mb-8">
            <Avatar sx={{ bgcolor: "skyblue" }}>
              <LockPersonIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: "bold" }}
              className="font-bold"
            >
              Sign in
            </Typography>
          </div>
          <TextField
            {...register("email")}
            label="Email"
            variant="outlined"
            type="email"
            required
            fullWidth
            sx={{ mb: 3 }}
          />
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              {...register("password")}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              required
            />
          </FormControl>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
            Sign in
          </Button>

          <div className="flex flex-col lg:flex-row justify-between mt-4">
            <Link to="" variant="body2" className="cursor-pointer">
              <span className="text-blue-600 underline"> Forgot password?</span>
            </Link>
            <Link to="/registration" variant="body2" className="cursor-pointer">
              <span className="text-blue-600 underline">
                {" "}
                Do not have an account? Sign Up
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
