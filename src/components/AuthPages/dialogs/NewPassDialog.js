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
import FormStyle from "src/styles/styles";

function OTPDialog({
  isNewPasswordOpen,
  setIsNewPasswordOpen,
  setIsSnackbarOpen,
}) {
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
  //change to an api folder later
  async function handleChangePassword(data) {
    try {
      console.log("test");
      setIsSnackbarOpen(true);
      setIsNewPasswordOpen(false);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Dialog
      fullWidth={true}
      open={isNewPasswordOpen}
      onClose={() => {
        setIsNewPasswordOpen(false);
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
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  "Password must contain one at least capital letter one small and one number ",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
        </FormStyle>
        {errors?.password?.message && (
          <Typography variant="body2" color={"red"} marginTop={2}>
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
          <Typography variant="body2" color={"red"} marginTop={2}>
            {errors?.otp?.message}
          </Typography>
        )}
        {watch("confirmPassword") !== watch("password") &&
        getValues("confirmPassword") ? (
          <Typography color={"red"} marginTop={2} variant="body2">
            Passwords do not match
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions sx={{ paddingTop: 0 }}>
        <FormStyle sx={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit(handleChangePassword)}
          >
            Change Password
          </Button>
        </FormStyle>
      </DialogActions>
    </Dialog>
  );
}

export default OTPDialog;
