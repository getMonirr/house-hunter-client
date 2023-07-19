import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import BookingModal from "../BookingModal/BookingModal";
import { useState } from "react";
import HotTubIcon from "@mui/icons-material/HotTub";
import HotelIcon from "@mui/icons-material/Hotel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const SingleHouseCard = ({
  house,
  isRenterBookingFull,
  renterBookingRefetch,
}) => {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const {
    image,
    description,
    name,
    bedrooms,
    bathrooms,
    room_size,
    rent_per_month,
  } = house;
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBooking = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to login first",
        confirmButtonText: "Login",
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          navigate("login");
        }
      });
    } else {
      openModal();
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: "full" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={image}
          className="h-[250px]"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center ">
              <IconButton>
                <BedIcon />
              </IconButton>
              <Typography marginLeft="6px">{bedrooms}</Typography>
            </div>
            <div className="flex items-center ">
              <IconButton>
                <HotTubIcon />
              </IconButton>
              <Typography marginLeft="6px">{bathrooms}</Typography>
            </div>
            <div className="flex items-center ">
              <IconButton>
                <HotelIcon />
              </IconButton>
              <Typography marginLeft="6px">{room_size}</Typography>
            </div>
            <div className="flex items-center ">
              <IconButton>
                <AttachMoneyIcon />
              </IconButton>
              <Typography>{rent_per_month}</Typography>
            </div>
          </div>
        </CardContent>
        <CardActions sx={{ justifyContent: "end" }}>
          <Button
            disabled={
              isRenterBookingFull?.bookingCount >= 2 || user?.role === "owner"
            }
            onClick={handleBooking}
            variant="contained"
          >
            Book
          </Button>
        </CardActions>
      </Card>

      <BookingModal
        renterBookingRefetch={renterBookingRefetch}
        isOpen={isOpen}
        closeModal={closeModal}
        house={house}
      />
    </>
  );
};

export default SingleHouseCard;
