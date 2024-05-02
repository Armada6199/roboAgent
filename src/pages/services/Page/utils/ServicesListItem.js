import { Card, Link, Typography } from "@material-ui/core";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { Link as RouteLink, redirect } from "react-router-dom";
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
  const navigateToService = () =>
    redirect(`/dash/services/getAnswer/${service.enName}`);
  return (
    <CardStyle style={{ cursor: "pointer" }} onClick={navigateToService}>
      {/* Image with Label */}
      <Link
        component={RouteLink}
        to={`/dash/services/getAnswer/${service.enName}`}
        underline="hover"
        color="inherit"
      >
        <Box
          sx={{ pt: "100%", position: "relative" }}
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
            alt={lang === "en" ? service.enName : service.arName}
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
          ></Box>
        </Box>
      </Link>
    </CardStyle>
  );
};

export default ServicesListItem;
