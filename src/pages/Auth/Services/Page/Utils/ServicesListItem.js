import { Card, Link, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Box } from "@mui/system";
import i18next from "i18next";
import { Link as RouteLink } from "react-router-dom";

// card style
const CardStyle = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),

  boxShadow: `rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 4px 8px -4px`,

  "&:hover": {
    boxShadow: `rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px`,
  },
}));

const ServicesListItem = (props) => {
  console.log("props ===> ", props);
  const serviceInfo = props.value;
  // label style
  // const LabelStyle = styled("label")(({ theme }) => ({
  //   fontWeight: 600,
  //   color: "white",
  //   backgroundColor: theme.palette.success.main,
  //   padding: "4px 6px",
  //   borderRadius: theme.spacing(1),
  //   zIndex: 9,
  //   position: "absolute",
  //   top: theme.spacing(2),
  //   right: theme.spacing(2),
  //   textTransform: "uppercase",
  // }));
  const navigateToService = () => {
    <>
      {localStorage.setItem("Service", props.service)}{" "}
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
          {/* {serviceInfo.status && <LabelStyle>{serviceInfo.status}</LabelStyle>} */}

          <Box
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
            }}
            component="img"
            src={serviceInfo.backgroundImg}
            alt={
              localStorage.getItem("lang") === "English"
                ? serviceInfo.enName
                : serviceInfo.arName
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
            {i18next.language === "English"
              ? serviceInfo.enName
              : serviceInfo.arName}
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
