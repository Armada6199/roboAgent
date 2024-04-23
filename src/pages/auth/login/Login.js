import { Container, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import FormLogin from "src/components/AuthPages/FormLogin";
import LeftPanel from "src/components/AuthPages/LeftPanel";

// img
import LoginPhoto from "src/assets/Images/image_processing20210907-13511-1juj33d.gif";
import { ContainerBoxStyle } from "src/styles/styles";
import { styled } from "@mui/material";

// styles

const RightPanelStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  "& .account_switch": {
    textAlign: "right",
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "& .MuiLink-underlineNone	": {
      color: theme.palette.green.darker,
      fontWeight: 500,
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(1),
    },
  },

  "& .form_Container": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    "& .MuiTypography-h4": {
      fontSize: 25,
      fontWeight: 500,
    },
    "& .MuiTypography-paragraph": {
      margin: "8px 0 20px 0",
    },
  },
}));
// const [t] = useTranslation('common')
const Login = () => {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>Login | RoboAgent</title>
      </Helmet>

      <ContainerBoxStyle container>
        <LeftPanel
          title="Hi, Login to continue"
          img={LoginPhoto}
          imgAlt="Login Image"
        />

        <RightPanelStyle>
          {/* <Typography paragraph className="account_switch">
            Don't have an account?{" "}
            <Link to="/register" component={RouterLink} underline="none">
              Request one
            </Link>
          </Typography> */}

          <Container maxWidth="xs" className="form_Container">
            <Typography variant="h4">Sign in</Typography>
            <Typography paragraph color="textSecondary">
              Enter your details below.
            </Typography>

            {/* Buttons */}
            {/* <AuthButtonGroup /> */}

            {/* Section Divider */}
            {/* <SectionDivider /> */}

            {/* The Actual Form 👇 */}
            <FormLogin />
          </Container>
        </RightPanelStyle>
      </ContainerBoxStyle>
    </>
  );
};

export default Login;
