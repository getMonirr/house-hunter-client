import { useMutation, useQuery } from "react-query";
import RenterBookingTable from "../../../components/RenterBookingTable/RenterBookingTable";
import SectionHeading from "../../../components/shared/SectionHeading";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Swal from "sweetalert2";

const RenterBookings = () => {
  const { user } = useAuth();

  const { secureAxios } = useSecureAxios();

  const { data: renterBookings, refetch } = useQuery({
    queryKey: ["renterBookings", user?.email],
    queryFn: async () =>
      secureAxios
        .get(`/bookings/renter/${user?.email}`)
        .then((res) => res?.data),
  });

  const deleteMutation = useMutation({
    mutationKey: ["deleteBookings", user?.email],
    mutationFn: (id) =>
      secureAxios.delete(`/bookings/${id}`).then((res) => res?.data),
    onSuccess: (res) => {
      if (res?.deletedCount) {
        Swal.fire("Delete successful", "you can book more now", "success");
        refetch();
      }
      console.log(res);
    },
  });

  // handle delete bookings
  const handleDeleteBookings = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteMutation.mutateAsync(id);
      }
    });
  };

  return (
    <div>
      <SectionHeading>Renter Bookings</SectionHeading>
      <RenterBookingTable
        renterBookings={renterBookings}
        handleDeleteBookings={handleDeleteBookings}
      />
    </div>
  );
};

export default RenterBookings;
