import { Container, Link, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import FormRegister from "src/components/AuthPages/FormRegister";
import LeftPanel from "src/components/AuthPages/LeftPanel";

// img
import RegisterPhoto from "src/assets/Images/auth/register.png";
import { TopPaneStyle } from "src/styles/styles";

// styles
const ContainerBoxStyle = styled(Box)(({ theme }) => ({
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight * 2}px)`,
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: `350px 1fr`,

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: `1fr`,
  },
}));

const RightPanelStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  "& .account_switch": {
    textAlign: "right",
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(8),
    "& .MuiLink-underlineNone	": {
      color: theme.palette.green.darker,
      fontWeight: 500,
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(1.5),
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

  "& .terms": {
    display: "block",
    marginTop: "24px !important",
    fontSize: 12,
    textAlign: "justify",

    "& a": {
      textDecorationColor: theme.palette.success.light,
      "&:hover": {
        textDecorationColor: theme.palette.common.black,
      },
    },
  },
}));

const Register = () => {
  const preventDefault = (e) => e.preventDefault();

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>Register | RoboAgent</title>
      </Helmet>

      <ContainerBoxStyle container>
        <LeftPanel
          title="Send Request to register a new user"
          img={RegisterPhoto}
          imgAlt="Register Image"
        />

        <RightPanelStyle>
          <TopPaneStyle
            item="true"
            textAlign="center"
            alignContent="center"
            width="100%"
            padding={1}
          >
            <Typography margin={3} variant="h3" style={{ fontWeight: "bold" }}>
              Registration request
            </Typography>
          </TopPaneStyle>
          {/* <Typography paragraph className="account_switch">
            Already have an account?{" "}
            <Link to="/auth/login" component={RouterLink} underline="none">
              Login
            </Link>
          </Typography> */}

          <Container className="form_Container" maxWidth="sm">
            {/* Buttons */}
            {/* <AuthButtonGroup /> */}

            {/* Section Divider */}
            {/* <SectionDivider /> */}

            {/* The Actual Form 👇 */}
            <FormRegister />

            {/* Terms */}
            <Typography paragraph color="textSecondary" className="terms">
              By registering, I agree to RoboAgent{" "}
              <Link
                href="#"
                onClick={preventDefault}
                underline="always"
                color="textPrimary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                onClick={preventDefault}
                underline="always"
                color="textPrimary"
              >
                Privacy Policy
              </Link>
              .
            </Typography>
          </Container>
        </RightPanelStyle>
      </ContainerBoxStyle>
    </>
  );
};

export default Register;
