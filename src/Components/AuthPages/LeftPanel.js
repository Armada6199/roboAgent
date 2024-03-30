import { Typography } from "@material-ui/core";
import { Box, styled } from "@mui/system";

// styles
const LeftPaneStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: `${theme.spacing}px ${theme.spacing}px`,
  borderRadius: theme.spacing,
  boxShadow:
    "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",

  "& .MuiTypography-h3": {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 48,
  },
  "& img": {
    alignSelf: "center",
    width: "100%",
    maxWidth: 400,
    objectFit: "cover",
  },

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const LeftPanel = ({ title, img, imgAlt, children }) => {
  return (
    <LeftPaneStyle>
      <Typography variant="h3">{title}</Typography>
      {children}
      <Box component="img" src={img} alt={imgAlt} loading="lazy" />
    </LeftPaneStyle>
  );
};

export default LeftPanel;
