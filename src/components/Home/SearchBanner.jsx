import { Button, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchBanner = ({handleSearch}) => {
  const [searchText, setSearchText] = useState("");



  return (
    <div className="bg-gray-400 min-h-[300px] flex items-center justify-center">
      <div className="w-[500px]">
        <Typography marginBottom="8px">Search Home by city</Typography>
        <div className="flex items-center gap-4">
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
  );
};

export default SearchBanner;
