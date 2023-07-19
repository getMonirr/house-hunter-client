import {
  Button,
  MenuItem,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
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
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [bedrooms, setBedrooms] = useState("");
  const [city, setCity] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [rentPerMonth, setRentPerMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // pagination
  const {
    data: houses,
    isLoading,
    refetch: refetchHouses,
  } = useQuery({
    queryKey: [
      "allHouse",
      user?.email,
      currentPage,
      itemsPerPage,
      searchQuery,
      bedrooms,
      city,
      bathrooms,
      roomSize,
      rentPerMonth,
      selectedDate,
    ],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_API_URL}/houses`, {
          params: {
            limit: itemsPerPage,
            skip: (currentPage - 1) * itemsPerPage,
            search: searchQuery,
            bedrooms,
            city,
            bathrooms,
            roomSize,
            rentPerMonth,
            selectedDate,
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

  // handle filter change
  const handleFilterChange = () => {
    setCurrentPage(1);
    refetchHouses();
  };

  return (
    <div>
      <SearchBanner handleSearch={handleSearch} />
      <HouseContainer>
        <SectionHeading>Explore your house</SectionHeading>
        <Typography marginBottom="8px">Filter Option</Typography>
        <form className="flex gap-8">
          <TextField
            select
            label="Select"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            helperText="select Bedrooms size"
            fullWidth
            size="small"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
          </TextField>

          <TextField
            select
            label="Select"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            helperText="select bathrooms size"
            fullWidth
            size="small"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
          </TextField>

          <TextField
            select
            label="Select"
            value={roomSize}
            onChange={(e) => setRoomSize(e.target.value)}
            helperText="select roomSize"
            fullWidth
            size="small"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
          </TextField>

          <TextField
            label="City"
            variant="outlined"
            size="small"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            helperText="select city"
          />
          <TextField
            label="Rent per month"
            variant="outlined"
            size="small"
            fullWidth
            value={rentPerMonth}
            onChange={(e) => setRentPerMonth(e.target.value)}
            helperText="select rendPerMonth"
          />
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            type="date"
            helperText="select date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <Button
            onClick={handleFilterChange}
            variant="contained"
            color="primary"
            fullWidth
            size="small"
          >
            Apply Filters
          </Button>
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
