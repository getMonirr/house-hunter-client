import { Button, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import HouseContainer from "../shared/HouseContainer";

const SearchBanner = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div
      className=" min-h-[300px] object-cover object-center bg-opacity-40 relative"
      style={{
        background: `url(https://source.unsplash.com/random?wallpapers)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center, center",
      }}
    >
      <div className=" min-h-[300px] w-full absolute top-0 left-0 opacity-25 bg-black"></div>
      <HouseContainer>
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="w-[500px] bg-slate-400 bg-opacity-50 rounded-xl p-8 backdrop-blur-3xl">
            <Typography marginBottom="8px" color="white">Search Home by city</Typography>
            <div className="flex items-center gap-4 lg:flex-row flex-col">
              <TextField
                onChange={(e) => setSearchText(e.target.value)}
                id="outlined-basic"
                label="City"
                variant="outlined"
                size="small"
                fullWidth
                className="bg-white rounded-lg border-2"
              />
              <Button
                onClick={() => handleSearch(searchText)}
                startIcon={<SearchIcon />}
                variant="contained"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </HouseContainer>
    </div>
  );
};

export default SearchBanner;
