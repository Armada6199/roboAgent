import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
} from "@material-ui/core";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";
import FormStyle from "src/styles/styles";
import CustomToast from "../toast/CustomToast";
import EmailDialog from "./dialogs/EmailDialog";
import NewPassDialog from "./dialogs/NewPassDialog";
import OTPDialog from "./dialogs/OTPDialog";

const FormLogin = () => {
  const [showPassword, setShowPassord] = useState(false);
  const [remember, setRemember] = useState(true);
  const [steps, setSteps] = useState(0);
  const [snackbarData, setSnackbarData] = useState({
    status: "",
    text: "",
    open: false,
  });
  const { login } = useContext(LoginContext);
  const handleTogglePassword = () => setShowPassord(!showPassword);
  const handleToggleRemember = () => setRemember(!remember);
  const setAlertInfo = useUpdateAlert();
  const [otpToken, setOtpToken] = useState("");
  console.log(steps);
  const handleNext = () => {
    setSteps((prev) => prev + 1);
  };
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberUser: true,
    },
  });

  // form submit

  // for reset

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarData((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <EmailDialog
        handleNext={handleNext}
        steps={steps}
        setSnackbarData={setSnackbarData}
        setOtpToken={setOtpToken}
      />
      {
        <OTPDialog
          handleNext={handleNext}
          setSnackbarData={setSnackbarData}
          email={getValues("email")}
          steps={steps}
          otpToken={otpToken}
        />
      }
      {
        <NewPassDialog
          setSnackbarData={setSnackbarData}
          email={getValues("email")}
          handleNext={handleNext}
          steps={steps}
          otpToken={otpToken}
        />
      }
      <FormStyle
        component="form"
        onSubmit={handleSubmit((loginData) => login(loginData, setAlertInfo))}
      >
        {/* Email */}
        <TextField
          variant="outlined"
          fullWidth
          type="email"
          label="Email address"
          error={errors.email ? true : false}
          helperText={errors.email && "Enter a valid email address"}
          {...register("email", { required: true })}
        />

        {/* Password */}
        <TextField
          variant="outlined"
          fullWidth
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleTogglePassword}>
                  {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Password"
          error={errors.password ? true : false}
          helperText={
            errors.password && "Enter a valid password (5-15 characters)"
          }
          {...register("password", {
            required: true,
            minLength: 5,
            maxLength: 50,
          })}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                className="ckbox"
                checked={remember}
                onChange={handleToggleRemember}
              />
            }
            label="Remember me"
            {...register("rememberUser")}
          />

          <Link onClick={() => setSteps(1)} href="#" underline="always">
            {t("Forgot password?")}
          </Link>
        </Box>

        <Button type="submit" variant="contained" disableElevation>
          {t("Login")}
        </Button>
        <CustomToast snackbarData={snackbarData} handleClose={handleClose} />
      </FormStyle>
    </>
  );
};

export default FormLogin;
