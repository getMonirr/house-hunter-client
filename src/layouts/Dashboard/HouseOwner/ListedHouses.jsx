import { Button } from "@mui/material";
import ListedHouseTable from "../../../components/ListedHouseTable/ListedHouseTable";
import SectionHeading from "../../../components/shared/SectionHeading";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";

const ListedHouses = () => {
  return (
    <div>
      <SectionHeading>All Listed Houses</SectionHeading>
      <div className="text-end mb-4">
        <Link to="/dashboard/add-new-house">
          <Button variant="contained" startIcon={<AddCircleIcon />}>
            Add New House
          </Button>
        </Link>
      </div>
      <ListedHouseTable />
    </div>
  );
};

export default ListedHouses;
