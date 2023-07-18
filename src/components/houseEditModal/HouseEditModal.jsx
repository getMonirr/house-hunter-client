import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import SectionHeading from "../shared/SectionHeading";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import useSecureAxios from "../../hooks/useSecureAxios";
import { getImgUrl } from "../../API/utilites";
import useAuth from "../../hooks/useAuth";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const HouseEditModal = ({ isOpen, closeModal, house, refetch }) => {
  const { user } = useAuth();

  const { register, handleSubmit } = useForm();
  const { secureAxios } = useSecureAxios();

  const {
    name,
    address,
    bathrooms,
    bedrooms,
    city,
    date,
    description,
    phone_number,
    rent_per_month,
    room_size,
    _id,
  } = house || {};

  const queryClient = useQueryClient();

  const houseMutation = useMutation({
    mutationKey: ["listedHouse", user?.email],
    mutationFn: (newHouseData) =>
      secureAxios.put(`/houses/${_id}`, { ...newHouseData }),
    onSuccess: (res) => {
      console.log(res);
      if (res?.data?.modifiedCount) {
        Swal.fire("House Added", "You can see the new house", "success");
        closeModal();
        refetch();
        queryClient.invalidateQueries(["listedHouse", user?.email]);
      }
    },
  });

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
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div>
                    <SectionHeading>Update House</SectionHeading>
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
                          defaultValue={name}
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
                          defaultValue={address}
                        />
                        <TextField
                          {...register("city")}
                          label="City"
                          variant="outlined"
                          type="text"
                          required
                          fullWidth
                          defaultValue={city}
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
                          defaultValue={bathrooms}
                        />
                        <TextField
                          {...register("bedrooms", { valueAsNumber: true })}
                          label="Bedrooms"
                          variant="outlined"
                          type="number"
                          required
                          fullWidth
                          defaultValue={bedrooms}
                        />
                        <TextField
                          {...register("room_size", { valueAsNumber: true })}
                          label="Room size"
                          variant="outlined"
                          type="number"
                          required
                          fullWidth
                          defaultValue={room_size}
                        />
                      </div>

                      <div className="flex gap-4">
                        <TextField
                          {...register("rent_per_month", {
                            valueAsNumber: true,
                          })}
                          label="Rent per month"
                          variant="outlined"
                          type="number"
                          required
                          fullWidth
                          defaultValue={rent_per_month}
                        />
                        <TextField
                          {...register("phone_number")}
                          label="Phone Number"
                          variant="outlined"
                          type="text"
                          required
                          fullWidth
                          defaultValue={phone_number}
                        />
                        <TextField
                          {...register("date")}
                          variant="outlined"
                          type="date"
                          required
                          fullWidth
                          defaultValue={date}
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
                        defaultValue={description}
                      />

                      <div className="text-end flex justify-between">
                        <Button
                          onClick={closeModal}
                          variant="contained"
                          type="submit"
                          color="error"
                        >
                          Cancel
                        </Button>
                        {isAddLoading ? (
                          <LoadingButton loading variant="outlined">
                            Submit
                          </LoadingButton>
                        ) : (
                          <Button
                            variant="contained"
                            type="submit"
                            color="success"
                          >
                            Add House
                          </Button>
                        )}
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default HouseEditModal;
