import { FormControl, TextField, Typography } from "@mui/material";
import SearchBanner from "../../components/Home/SearchBanner";
import SingleHouseCard from "../../components/Home/SingleHouseCard";
import HouseContainer from "../../components/shared/HouseContainer";
import SectionHeading from "../../components/shared/SectionHeading";

const Home = () => {
  return (
    <div>
      <SearchBanner />
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
            <TextField variant="outlined" size="small" fullWidth type="date"/>
          </FormControl>
        </form>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-16">
          <SingleHouseCard />
          <SingleHouseCard />
          <SingleHouseCard />
          <SingleHouseCard />
          <SingleHouseCard />
        </div>
      </HouseContainer>
    </div>
  );
};

export default Home;
