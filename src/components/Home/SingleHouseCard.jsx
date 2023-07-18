import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";

const SingleHouseCard = () => {
  return (
    <Card sx={{ maxWidth: "full" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <div className="flex items-center gap-4">
          <div className="flex items-center ">
            <IconButton>
              <BedIcon />
            </IconButton>
            <Typography marginLeft="6px">two sit</Typography>
          </div>
          <div className="flex items-center ">
            <IconButton>
              <BedIcon />
            </IconButton>
            <Typography marginLeft="6px">two sit</Typography>
          </div>
          <div className="flex items-center ">
            <IconButton>
              <BedIcon />
            </IconButton>
            <Typography marginLeft="6px">two sit</Typography>
          </div>
        </div>
      </CardContent>
      <CardActions sx={{justifyContent: "end"}}>
        <Button variant="contained">Share</Button>
      </CardActions>
    </Card>
  );
};

export default SingleHouseCard;
