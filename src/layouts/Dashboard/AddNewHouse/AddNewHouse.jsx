import { Button, TextField } from "@mui/material";
import SectionHeading from "../../../components/shared/SectionHeading";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";

const AddNewHouse = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

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
            {...register("bathrooms")}
            label="Bathrooms"
            variant="outlined"
            type="text"
            required
            fullWidth
          />
          <TextField
            {...register("bedrooms")}
            label="Bedrooms"
            variant="outlined"
            type="text"
            required
            fullWidth
          />
          <TextField
            {...register("room_size")}
            label="Room size"
            variant="outlined"
            type="text"
            required
            fullWidth
          />
        </div>

        <div className="flex gap-4">
          <TextField
            {...register("rent_per_month")}
            label="Rent per month"
            variant="outlined"
            type="text"
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
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            endIcon={<SendIcon />}
            type="submit"
          >
            Add House
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewHouse;
