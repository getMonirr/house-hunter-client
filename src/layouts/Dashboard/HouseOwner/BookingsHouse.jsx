import { useQuery } from "react-query";
import BookingTable from "../../../components/BookingTable/BookingTable";
import SectionHeading from "../../../components/shared/SectionHeading";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";

const BookingsHouse = () => {
  const { user } = useAuth();

  const { secureAxios } = useSecureAxios();

  // load house information
  const { data: bookingHouses } = useQuery({
    queryKey: ["listedHouses", user?.email],
    queryFn: () =>
      secureAxios.get(`/bookings?${user?.email}`).then((res) => res.data),
  });

  return (
    <div>
      <SectionHeading>All Booking Houses</SectionHeading>
      <BookingTable bookingHouse={bookingHouses} />
    </div>
  );
};

export default BookingsHouse;
