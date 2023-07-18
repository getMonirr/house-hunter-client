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

const BookingTable = ({  bookingHouses }) => {
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
            {bookingHouses &&
              Array.isArray(bookingHouses) &&
              bookingHouses.map((house, index) => (
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
                    {house?.isBooking ? house?.isBooking : "Not Booking"}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      startIcon={<DeleteForeverIcon />}
                      color="error"
                      align="center"
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
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
    </>
  );
};

export default BookingTable;
