import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
} from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import { useUpdateLoginInfo } from "src/hooks/Context/LoginInfoContext";
import FormStyle from "src/styles/styles";
import AxiosHit from "src/utils/api/AxiosHit";
import { HandelRegularHit } from "src/utils/HitHandiling";
import OTPDialon from "./OTPDialog";
import OTPDialog from "./OTPDialog";

const FormLogin = () => {
  const [showPassword, setShowPassord] = useState(false);
  const [remember, setRemember] = useState(true);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const loginUpdate = useUpdateLoginInfo();

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
    console.log("hitResult ===> ", hitResult);

    HandelRegularHit({ hitResult, setAlertInfo, loginUpdate, values });
  };

  // for reset
  const sendEmail = () => {};
  const sendOtp = () => {
    sendEmail();
    setOpen(false);
    setOpen2(true);
  };

  // couldn't make it work

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
              onClick={emailHandleSubmit(sendOtp)}
            >
              Next
            </Button>
          </FormStyle>
        </DialogActions>
      </Dialog>
      <OTPDialog sendEmail={sendEmail} setOpen2={setOpen2} open2={open2} />
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
      </FormStyle>
    </>
  );
};

export default FormLogin;
