import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import BedIcon from "@mui/icons-material/Bed";
import ShowerIcon from "@mui/icons-material/Shower";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HouseEditModal from "../houseEditModal/HouseEditModal";
import { useState } from "react";

const ListedHouseTable = ({ listedHouses, handleDelete, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleEdit = (house) => {
    setSelectedHouse(house);
    openModal();
    console.log("edited");
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Bedrooms</TableCell>
              <TableCell align="right">Bathrooms</TableCell>
              <TableCell align="right">Rent Per Month</TableCell>
              <TableCell align="right">Available Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listedHouses &&
              Array.isArray(listedHouses) &&
              listedHouses.map((house, index) => (
                <TableRow
                  key={house._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      className="w-12 mb-2"
                      src={house.image}
                      alt={house.name}
                    />
                    {house.name}
                  </TableCell>
                  <TableCell align="right">
                    <BedIcon /> {house.bedrooms}
                  </TableCell>
                  <TableCell align="right">
                    <ShowerIcon />
                    {house.bathrooms}
                  </TableCell>
                  <TableCell align="right">
                    <AttachMoneyIcon />
                    {house.rent_per_month}
                  </TableCell>
                  <TableCell align="right">
                    <CalendarMonthIcon />
                    <span className="ml-2">{house.date}</span>
                  </TableCell>

                  <TableCell align="right">
                    {house?.isBooking ? "Booked" : "Not Booking"}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleDelete(house._id)}
                      startIcon={<DeleteForeverIcon />}
                      color="error"
                      align="center"
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleEdit(house)}
                      startIcon={<EditIcon />}
                      color="success"
                      align="center"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <HouseEditModal
        isOpen={isOpen}
        closeModal={closeModal}
        house={selectedHouse}
        refetch={refetch}
      />
    </>
  );
};

export default ListedHouseTable;
