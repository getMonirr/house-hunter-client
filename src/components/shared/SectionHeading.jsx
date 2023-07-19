import { Typography } from "@mui/material";

const SectionHeading = ({ children }) => {
  return (
    <Typography variant="h4" component="h1" textAlign="center" className="uppercase font-bold" marginBottom={8} marginTop={4} fontWeight={700}>
      <span className="text-2xl lg:text-3xl">{children}</span>
    </Typography>


  );
};

export default SectionHeading;
