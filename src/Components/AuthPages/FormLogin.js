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
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";
import FormStyle from "src/styles/styles";
import { HandelRegularHit } from "src/utils/HitHandiling";
import AxiosHit from "src/utils/api/AxiosHit";
import CustomToast from "../toast/CustomToast";
import EmailDialog from "./dialogs/EmailDialog";
import NewPassDialog from "./dialogs/NewPassDialog";
import OTPDialog from "./dialogs/OTPDialog";
const FormLogin = () => {
  const [showPassword, setShowPassord] = useState(false);
  const [remember, setRemember] = useState(true);
  const [steps, setSteps] = useState(-1);
  const [snackbarData, setSnackbarData] = useState({
    status: "",
    text: "",
    open: false,
  });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { loginDispatch } = useContext(LoginContext);
  const [isNewPasswordOpen, setIsNewPasswordOpen] = useState(false);

  const handleTogglePassword = () => setShowPassord(!showPassword);
  const handleToggleRemember = () => setRemember(!remember);
  const setAlertInfo = useUpdateAlert();
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
      />
      {console.log(steps)}
      {steps === 1 && (
        <OTPDialog
          handleNext={handleNext}
          setSnackbarData={setSnackbarData}
          email={getValues("email")}
          steps={steps}
        />
      )}
      {steps == 2 && (
        <NewPassDialog
          setSnackbarData={setSnackbarData}
          email={getValues("email")}
          handleNext={handleNext}
          steps={steps}
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

          <Link onClick={() => setSteps(0)} href="#" underline="always">
            Forgot password?
          </Link>
        </Box>

        <Button type="submit" variant="contained" disableElevation>
          Login
        </Button>
        <CustomToast snackbarData={snackbarData} handleClose={handleClose} />
      </FormStyle>
    </>
  );
};

export default FormLogin;
