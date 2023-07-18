import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
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
      <div className="w-full lg:w-1/3 flex justify-center px-16 py-32">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="flex flex-col items-center gap-3 mb-8">
            <Avatar sx={{ bgcolor: "skyblue" }}>
              <VpnKeyIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: "bold" }}
              className="font-bold"
              align="center"
            >
              Welcome to House Hunter
              <br />
              <span className="text-pink-600">Please Register</span>
            </Typography>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <TextField
              {...register("firstName")}
              label="First name"
              variant="outlined"
              type="text"
              required
              fullWidth
            />
            <TextField
              {...register("lastName")}
              label="Last name"
              variant="outlined"
              type="text"
              required
              fullWidth
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <TextField
              {...register("role")}
              id="outlined-select-currency"
              select
              label="Role"
              defaultValue="renter"
              helperText="Please select your Role"
              fullWidth
            >
              <MenuItem value="owner">House Owner</MenuItem>
              <MenuItem value="renter">House Renter</MenuItem>
            </TextField>
            <TextField
              {...register("phoneNumber")}
              label="Phone Number"
              variant="outlined"
              type="text"
              required
              fullWidth
            />
          </div>

          <TextField
            {...register("email")}
            label="Email"
            variant="outlined"
            type="email"
            required
            fullWidth
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
            Sign up
          </Button>

          <div className="flex flex-col lg:flex-row justify-end mt-4">
            <Link to="/login" variant="body2" className="cursor-pointer">
              <span className="text-blue-600 underline">
                Already have an account? Sign in
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
