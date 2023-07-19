import {
  Avatar,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const Registration = () => {
  const [isRegistrationLoading, setIsRegistrationLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // navigate
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  // registration handle
  const onSubmit = (data) => {
    setIsRegistrationLoading(true);

    // register a user
    axios
      .post(`${import.meta.env.VITE_API_URL}/users`, { ...data })
      .then((res) => {
        if (res?.data?.insertedId) {
          // show success message
          Swal.fire(
            "Registration Successful",
            "Please login and goto dashboard",
            "success"
          );

          // navigate user to login page
          navigate("/login");
          setIsRegistrationLoading(false);
        }
        if (res?.data?.isExist) {
          Swal.fire({
            title: "User already registered",
            text: "Please login with your email and password",
            icon: "question",
            confirmButtonText: "Goto login",
          }).then(() => navigate("/login"));
        }

        setIsRegistrationLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(err);
        setIsRegistrationLoading(false);
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
      <div className="w-full md:w-1/2 mx-auto lg:w-1/3 flex justify-center px-3 xl:px-16 py-32">
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
              {...register("phoneNumber", {
                pattern: /^(?:\+?88)?01[135-9]\d{8}$/,
              })}
              label="Phone Number"
              variant="outlined"
              type="text"
              required
              fullWidth
              placeholder="+8801771909060"
              helperText="only BD numbers are allowed"
            />

            {errors.phoneNumber && (
              <span className="text-red-500">only bd number</span>
            )}
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
              {...register("password", {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              })}
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
            {
              <>
                <span
                  className={`${errors.password ? "text-red-500" : ""} text-xs`}
                >
                  Minimum 6 characters, at least one uppercase & lowercase
                  letter, one number and special character:
                </span>
                <div className="flex flex-col gap-1">
                  {/^.*[a-z].*$/.test(watch("password")) ? (
                    <span className="text-green-500 text-xs">
                      One lower case latter
                    </span>
                  ) : (
                    <span className="text-red-500 text-xs">
                      One lower case latter
                    </span>
                  )}
                  {/^.*[A-Z].*$/.test(watch("password")) ? (
                    <span className="text-green-500 text-xs">
                      One Upper case latter
                    </span>
                  ) : (
                    <span className="text-red-500 text-xs">
                      One Upper case latter
                    </span>
                  )}
                  {/^.*[@$!%*?&].*$/.test(watch("password")) ? (
                    <span className="text-green-500 text-xs">
                      One Special Character
                    </span>
                  ) : (
                    <span className="text-red-500 text-xs">
                      One Special Character
                    </span>
                  )}
                  {/^.*\d.*$/.test(watch("password")) ? (
                    <span className="text-green-500 text-xs">One number</span>
                  ) : (
                    <span className="text-red-500 text-xs">One number</span>
                  )}
                  {watch("password")?.length >= 6 ? (
                    <span className="text-green-500 text-xs">6 Char long</span>
                  ) : (
                    <span className="text-red-500 text-xs">6 Char long</span>
                  )}
                </div>
              </>
            }
          </FormControl>

          <LoadingButton
            loading={isRegistrationLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4 }}
          >
            Registration
          </LoadingButton>

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
