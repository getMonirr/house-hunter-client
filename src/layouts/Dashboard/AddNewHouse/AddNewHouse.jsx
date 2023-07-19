import { TextField } from "@mui/material";
import SectionHeading from "../../../components/shared/SectionHeading";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { getImgUrl } from "../../../API/utilites";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

const AddNewHouse = () => {
  const [isAddLoading, setIsAddLoading] = useState(false);

  const { user } = useAuth();
  const { secureAxios } = useSecureAxios();

  // navigate
  const navigate = useNavigate();

  const houseMutation = useMutation({
    mutationFn: (newHouseData) =>
      secureAxios.post("/houses", { ...newHouseData }),
    onSuccess: (res) => {
      if (res?.data?.insertedId) {
        Swal.fire("House Added", "You can see the new house", "success");
        navigate("/dashboard/listed-house");
        setIsAddLoading(false);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsAddLoading(true);
    try {
      // get img url
      const imageFile = data.image[0];
      const imgUrl = await getImgUrl(imageFile);

      // prepare new house
      // eslint-disable-next-line no-unused-vars
      const { image, ...withoutImage } = data;
      const newHouse = {
        ...withoutImage,
        ownerEmail: user?.email,
        image: imgUrl,
      };

      console.log(newHouse);
      await houseMutation.mutateAsync(newHouse);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.log(err);
      setIsAddLoading(false);
    }
  };

  return (
    <div>
      <SectionHeading>Add a new House</SectionHeading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-200 p-8 rounded-xl max-w-4xl mx-auto space-y-4"
      >
        <div className="flex gap-4">
          <TextField
            {...register("name")}
            label="Name"
            variant="outlined"
            type="text"
            required
            fullWidth
          />
        </div>
        <div className="flex gap-4">
          <TextField
            {...register("address")}
            label="Address"
            variant="outlined"
            type="text"
            required
            fullWidth
          />
          <TextField
            {...register("city")}
            label="City"
            variant="outlined"
            type="text"
            required
            fullWidth
          />
        </div>
        <div className="flex gap-4">
          <TextField
            {...register("bathrooms", { valueAsNumber: true })}
            label="Bathrooms"
            variant="outlined"
            type="number"
            required
            fullWidth
          />
          <TextField
            {...register("bedrooms", { valueAsNumber: true })}
            label="Bedrooms"
            variant="outlined"
            type="number"
            required
            fullWidth
          />
          <TextField
            {...register("room_size", { valueAsNumber: true })}
            label="Room size"
            variant="outlined"
            type="number"
            required
            fullWidth
          />
        </div>

        <div className="flex gap-4">
          <TextField
            {...register("rent_per_month", { valueAsNumber: true })}
            label="Rent per month"
            variant="outlined"
            type="number"
            required
            fullWidth
          />
          <TextField
            {...register("phone_number", {
              pattern: /^(?:\+?88)?01[135-9]\d{8}$/,
            })}
            label="Phone Number"
            variant="outlined"
            type="text"
            required
            fullWidth
            placeholder="+8801771909060"
          />
          {errors.phone_number && (
            <span className="text-xs text-red-400">
              phoneNumber is not valid, only bd number
            </span>
          )}
          <TextField
            {...register("date")}
            variant="outlined"
            type="date"
            required
            fullWidth
          />
        </div>
        <TextField
          {...register("image")}
          variant="outlined"
          type="file"
          required
          fullWidth
        />
        <TextField
          {...register("description")}
          label="Description"
          variant="outlined"
          type="text"
          multiline
          rows={4}
          required
          fullWidth
        />

        <div className="text-end">
          <LoadingButton
            loading={isAddLoading}
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            endIcon={<SendIcon />}
            type="submit"
          >
            Add House
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default AddNewHouse;
