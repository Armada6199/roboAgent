import { Card, Link, Typography } from "@material-ui/core";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { Link as RouteLink } from "react-router-dom";
import i18n from "src/dictonaries/i18n";

// card style
const CardStyle = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: `rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 4px 8px -4px`,
  "&:hover": {
    boxShadow: `rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px`,
  },
}));

const ServicesListItem = ({ service }) => {
  const lang = i18n.language;
  const navigateToService = () => {
    <>
      {localStorage.setItem("Service", service.enName)}{" "}
      <RouteLink to="/dash/services/getAnswer" />
    </>;
  };
  return (
    <CardStyle style={{ cursor: "pointer" }} onClick={navigateToService}>
      {/* Image with Label */}
      <Link
        component={RouteLink}
        to="/dash/services/getAnswer"
        underline="hover"
        color="inherit"
      >
        <Box
          sx={{ pt: "100%", position: "relative" }}
          bgcolor="gray"
          href="/dash/services/getAnswer"
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
            }}
            component="img"
            src={service.backgroundImg}
            alt={
              localStorage.getItem("lang") === "English"
                ? service.enName
                : service.arName
            }
          />
        </Box>

        {/* bottom of the card */}
        <Box sx={{ py: 2.5, px: 3 }}>
          <Typography
            align="center"
            variant="subtitle1"
            style={{ fontWeight: "bold", fontSize: "20px" }}
            noWrap
          >
            {lang === "en" ? service.enName : service.arName}
          </Typography>

          {/* Price & Color box */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* <ProductColorPreview colors={colors} limit={3} /> */}

            {/* <ProductPrice price={price} priceSale={priceSale} /> */}
          </Box>
        </Box>
      </Link>
    </CardStyle>
  );
};

export default ServicesListItem;
