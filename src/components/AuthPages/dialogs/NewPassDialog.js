import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import FormStyle from "src/styles/styles";
import { handleRestPassword } from "src/utils/api/auth/otp";

function OTPDialog({ handleNext, steps, setSnackbarData, otpToken }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const setAlertInfo = useUpdateAlert();
  return (
    <Dialog
      fullWidth={true}
      open={steps === 3}
      sx={{
        textAlign: "center",
        "& .MuiPaper-root": {
          padding: 1.5,
        },
      }}
    >
      <DialogTitle>
        <Typography fontSize={20} fontWeight={"bold"}>
          Change Your Password
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ paddingX: 1, paddingY: 0 }}>
        <DialogContentText fontWeight={"bold"}>
          Enter a new password below to change your password
        </DialogContentText>
        <FormStyle sx={{ width: "100%" }}>
          <TextField
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // error={errors.email ? true : false}
            // helperText={errors.email && "Enter a valid email address"}
            {...register("password", {
              required: true,
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  "Password must contain at least one capital letter one small and one number",
              },
              // minLength: {
              //   value: 8,
              //   message: "Password must be at least 8 characters",
              // },
            })}
          />
        </FormStyle>
        {errors?.password?.message && (
          <Typography variant="body2" color={"#FF0000"} marginTop={2}>
            {errors?.password?.message}
          </Typography>
        )}
        <FormStyle sx={{ width: "100%" }}>
          <TextField
            variant="outlined"
            fullWidth
            // disabled={errors.password ? true : false}
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // error={errors.email ? true : false}
            // helperText={errors.email && "Enter a valid email address"}
            {...register("confirmPassword", { required: true })}
          />
        </FormStyle>
        {errors?.otp?.message && (
          <Typography variant="body2" color={"#FF0000"} marginTop={2}>
            {errors?.otp?.message}
          </Typography>
        )}
        {watch("confirmPassword") !== watch("password") &&
        getValues("confirmPassword") ? (
          <Typography color={"#FF0000"} marginTop={2} variant="body2">
            Passwords do not match
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions sx={{ paddingTop: 0 }}>
        <FormStyle sx={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit((data) =>
              handleRestPassword({
                newPass: data.password,
                handleNext,
                setAlertInfo,
                otpToken,
              })
            )}
          >
            Change Password
          </Button>
        </FormStyle>
      </DialogActions>
    </Dialog>
  );
}

export default OTPDialog;
