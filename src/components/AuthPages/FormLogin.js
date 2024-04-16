import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
} from "@material-ui/core";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import FormStyle from "src/styles/styles";
import { HandelRegularHit } from "src/utils/HitHandiling";
import AxiosHit from "src/utils/api/AxiosHit";
import NewPassDialog from "./dialogs/NewPassDialog";
import OTPDialog from "./dialogs/OTPDialog";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";
import { handleVerifyEmail } from "src/utils/api/auth/otp";
const FormLogin = () => {
  const [showPassword, setShowPassord] = useState(false);
  const [remember, setRemember] = useState(true);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [snackBarText, setSnackbarText] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { loginDispatch } = useContext(LoginContext);
  const [isNewPasswordOpen, setIsNewPasswordOpen] = useState(false);

  const handleTogglePassword = () => setShowPassord(!showPassword);
  const handleToggleRemember = () => setRemember(!remember);
  const setAlertInfo = useUpdateAlert();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberUser: true,
    },
  });
  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    getValues,
    formState: { errors: emailErrors },
  } = useForm();

  // form submit
  const onSubmit = async (values) => {
    // console.table(values);
    // alert(JSON.stringify(data));
    let hitResult = await AxiosHit({
      method: "post",
      url: "users/signin",
      data: {
        email: values.email,
        password: values.password,
      },
    });
    HandelRegularHit({ hitResult, setAlertInfo, loginDispatch, values });
  };

  // for reset
  const sendEmail = () => {};
  const sendOtp = () => {
    sendEmail();
    setOpen(false);
    setOpen2(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };
  return (
    <>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          textAlign: "center",
          "& .MuiPaper-root": {
            padding: 1.5,
          },
        }}
      >
        <DialogTitle>
          <Typography fontSize={20} fontWeight={"bold"}>
            Reset a Password
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ paddingX: 1, paddingY: 0 }}>
          <DialogContentText fontWeight={"bold"}>
            Please enter your email that you wish to change a password for
          </DialogContentText>
          <FormStyle sx={{ width: "100%" }}>
            <TextField
              fullWidth
              {...emailRegister("email", { required: "Email is Required" })}
            />
          </FormStyle>
          {emailErrors?.email?.message && (
            <Typography color={"red"} marginTop={2}>
              {emailErrors?.email?.message}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ paddingTop: 0 }}>
          <FormStyle sx={{ width: "100%" }}>
            <Button
              fullWidth
              variant="contained"
              onClick={emailHandleSubmit((data) =>
                handleVerifyEmail(
                  data.email,
                  sendOtp,
                  setSnackbarText,
                  setIsSnackbarOpen
                )
              )}
            >
              Next
            </Button>
          </FormStyle>
        </DialogActions>
      </Dialog>
      {open2 && (
        <OTPDialog
          sendEmail={sendEmail}
          setIsNewPasswordOpen={setIsNewPasswordOpen}
          setOpen2={setOpen2}
          open2={open2}
          email={getValues("email")}
          setSnackbarText={setSnackbarText}
          setIsSnackbarOpen={setIsSnackbarOpen}
        />
      )}
      {isNewPasswordOpen && (
        <NewPassDialog
          isNewPasswordOpen={isNewPasswordOpen}
          setIsNewPasswordOpen={setIsNewPasswordOpen}
          setIsSnackbarOpen={setIsSnackbarOpen}
          setSnackbarText={setSnackbarText}
          email={getValues("email")}
        />
      )}
      <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
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

          <Link
            onClick={() => {
              setOpen(true);
            }}
            href="#"
            underline="always"
          >
            Forgot password?
          </Link>
        </Box>

        <Button type="submit" variant="contained" disableElevation>
          Login
        </Button>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackBarText}
          </Alert>
        </Snackbar>
      </FormStyle>
    </>
  );
};

export default FormLogin;
