import { Button, TextField } from "@mui/material";
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

const AddNewHouse = () => {
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
      }
    },
  });

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
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
    }
  };
  const isAddLoading = houseMutation.isLoading;

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
            {...register("phone_number")}
            label="Phone Number"
            variant="outlined"
            type="text"
            required
            fullWidth
          />
          <TextField
            {...register("date")}
            variant="outlined"
            type="date"
            required
            fullWidth
          />
          <TextField
            {...register("image")}
            variant="outlined"
            type="file"
            required
            fullWidth
          />
        </div>
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
          {isAddLoading ? (
            <LoadingButton loading variant="outlined">
              Submit
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              endIcon={<SendIcon />}
              type="submit"
            >
              Add House
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddNewHouse;
