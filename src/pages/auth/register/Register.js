import { Container, Link, Typography } from "@material-ui/core";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import FormRegister from "src/components/AuthPages/FormRegister";
import LeftPanel from "src/components/AuthPages/LeftPanel";

// img
import { useState } from "react";
import { useForm } from "react-hook-form";
import RegisterPhoto from "src/assets/Images/auth/register.png";
import FinalRegister from "src/components/AuthPages/FinalRegister";
import CustomStepper from "src/components/AuthPages/stepper/CustomStepper";
import {
  handleSubmitNewUser,
  handleSubmitUserAuths,
} from "src/utils/users/api/users";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";

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
    marginBottom: theme.spacing(7),
    "& .MuiLink-underlineNone	": {
      color: theme.palette.green.darker,
      fontWeight: 500,
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(2),
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
  const [activeStep, setActiveStep] = useState(0);
  const [registeredId, setRegisteredId] = useState(null);
  const [userData, setUserData] = useState({});
  const setAlertInfo = useUpdateAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const handleNext = (data) => {
    if (activeStep == 0) {
      setUserData((prev) => ({ ...prev, ...data }));
      setActiveStep((prev) => prev + 1);
    } else {
      handleSubmitNewUser(
        { ...userData, ...data },
        {
          setRegisteredId,
          setAlertInfo,
          requestAction: "REGISTER_NEW_USER",
        }
      );
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
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
          <CustomStepper activeStep={activeStep} />

          <Container className="form_Container" maxWidth="md">
            {/* The Actual Form 👇 */}
            {activeStep == 0 && (
              <FormRegister
                register={register}
                setRegisteredId={setRegisteredId}
                handleNext={handleNext}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            )}
            {activeStep == 1 && (
              <FinalRegister
                registeredId={registeredId}
                handleBack={handleBack}
                handleNext={handleNext}
              />
            )}
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
