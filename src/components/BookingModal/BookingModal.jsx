import { Dialog, Transition } from "@headlessui/react";
import { Button, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const BookingModal = ({ isOpen, closeModal, house, renterBookingRefetch }) => {
  const [isBookLoading, setIsBookLoading] = useState(false);

  const { user } = useAuth();

  const { _id, ...restHouseData } = house;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsBookLoading(true);

    const phoneNumber = data.renterPhoneNumber;
    const BD_PHONE_REGEX = /^(?:\+?88)?01[135-9]\d{8}$/;
    const isValid = BD_PHONE_REGEX.test(phoneNumber);
    if (isValid) {
      const newBooking = {
        ...data,
        bookedHouseId: _id,
        ...restHouseData,
      };

      // add new booking to the database
      axios
        .post(`${import.meta.env.VITE_API_URL}/bookings`, { ...newBooking })
        .then((res) => {
          if (res.data?.insertedId) {
            Swal.fire(
              "Booked successful",
              "Your bookings is successful",
              "success"
            );
            closeModal();
            renterBookingRefetch();
            setIsBookLoading(false);
          }
          console.log(res);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          console.log(err);
          setIsBookLoading(false);
        });
    }
  };

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl mb-10 font-medium leading-6 text-gray-900"
                  >
                    Booking this house
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <TextField
                      {...register("renterEmail")}
                      label="Email"
                      variant="outlined"
                      type="email"
                      fullWidth
                      defaultValue={user?.email}
                      readOnly
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      {...register("renterName")}
                      label="Name"
                      variant="outlined"
                      type="name"
                      fullWidth
                      defaultValue={user?.firstName}
                      readOnly
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      {...register("renterPhoneNumber", {
                        pattern: /^(?:\+?88)?01[135-9]\d{8}$/,
                      })}
                      label="Phone Number"
                      variant="outlined"
                      type="text"
                      fullWidth
                      readOnly
                      required
                      size="small"
                      helperText="only bd number"
                      placeholder="880177190960"
                    />
                    {errors.renterPhoneNumber && (
                      <span className="text-red-500">
                        Phone Number not valid
                      </span>
                    )}
                    <div className="mt-8 flex items-center justify-between">
                      <Button
                        onClick={closeModal}
                        variant="contained"
                        color="error"
                      >
                        Cancel
                      </Button>

                      <LoadingButton
                        loading={isBookLoading}
                        type="submit"
                        variant="contained"
                        color="success"
                      >
                        Book
                      </LoadingButton>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BookingModal;
