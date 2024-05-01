import { Typography, Button } from "@material-ui/core";
import { Box } from "@mui/system";
import { styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import image from "src/assets/Images/something-went-wrong-4344462-3613890.webp";
import { Helmet } from "react-helmet";

// style
const BoxStyle = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.sm,
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight * 2}px)`,
  margin: "0 auto",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  "& .MuiTypography-paragraph": {
    marginTop: 20,
    marginBottom: 20,
  },
  "& img": {
    width: "100%",
    maxWidth: 400,
    objectFit: "cover",
  },
  "& .MuiButton-root": {
    backgroundColor: theme.palette.green.darker,
    color: "#fff",
    marginTop: 40,
  },

  [theme.breakpoints.down("sm")]: {
    "& .MuiTypography-h3": { fontSize: 30, fontWeight: 500 },
  },
}));

const SomethingWentWrongError = () => {
  return (
    <>
      <Helmet>
        <title>500 | RoboAgent</title>
      </Helmet>
      <BoxStyle>
        <Typography variant="h3">Something Went Wrong</Typography>

        <Typography paragraph color="textSecondary">
          Sorry Something went wrong from our side
        </Typography>

        <img src={image} alt="404 Error" loading="lazy" />

        <Button
          to="/"
          variant="contained"
          component={RouterLink}
          size="large"
          disableElevation
        >
          Go to Home
        </Button>
      </BoxStyle>
    </>
  );
};

export default SomethingWentWrongError;
