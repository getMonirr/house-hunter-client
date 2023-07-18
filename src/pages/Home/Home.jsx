import { FormControl, Pagination, TextField, Typography } from "@mui/material";
import SearchBanner from "../../components/Home/SearchBanner";
import SingleHouseCard from "../../components/Home/SingleHouseCard";
import HouseContainer from "../../components/shared/HouseContainer";
import SectionHeading from "../../components/shared/SectionHeading";
import { useQuery } from "react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Home = () => {
  const { user } = useAuth();
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // pagination
  const { data: houses, isLoading } = useQuery({
    queryKey: ["allHouse", user?.email, currentPage, itemsPerPage, searchQuery],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_API_URL}/houses`, {
          params: {
            limit: itemsPerPage,
            skip: (currentPage - 1) * itemsPerPage,
            search: searchQuery,
          },
        })
        .then((res) => res?.data),
  });

  // get all house data
  const { data: allHouses } = useQuery({
    queryKey: ["allHousesData"],
    queryFn: async () =>
      axios
        .get(`${import.meta.env.VITE_API_URL}/allHouses`)
        .then((res) => res?.data),
  });

  // handle pagination
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // get renter booking number
  const { data: isRenterBookingFull, refetch: renterBookingRefetch } = useQuery(
    {
      queryKey: ["renterBookingNumber", user?.email],
      queryFn: () =>
        axios
          .get(
            `${import.meta.env.VITE_API_URL}/bookings/renter-number/${
              user?.email
            }`
          )
          .then((res) => res?.data),
    }
  );

  // search for bookings

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  return (
    <div>
      <SearchBanner handleSearch={handleSearch} />
      <HouseContainer>
        <SectionHeading>Explore your house</SectionHeading>
        <Typography marginBottom="8px">Filter Option</Typography>
        <form className="flex gap-8">
          <TextField
            label="Bedrooms"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField label="City" variant="outlined" size="small" fullWidth />
          <TextField
            label="Bathrooms"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            label="Room Size"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            label="Rent per month"
            variant="outlined"
            size="small"
            fullWidth
          />
          <FormControl fullWidth label="date">
            <TextField variant="outlined" size="small" fullWidth type="date" />
          </FormControl>
        </form>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-16">
          {isLoading ? (
            <>Loading...</>
          ) : (
            houses &&
            Array.isArray(houses) &&
            houses.map((house) => (
              <SingleHouseCard
                isRenterBookingFull={isRenterBookingFull}
                renterBookingRefetch={renterBookingRefetch}
                key={house._id}
                house={house}
              />
            ))
          )}
        </div>

        <div className="flex justify-center items-center">
          {allHouses && (
            <Pagination
              count={Math.ceil(allHouses.length / itemsPerPage)}
              onChange={handlePageChange}
              color="primary"
            />
          )}
        </div>
      </HouseContainer>
    </div>
  );
};

export default Home;
