import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import FormStyle from "src/styles/styles";
function OTPDialog({ isNewPasswordOpen, setIsNewPasswordOpen }) {
  const {
    register: otpRegister,
    handleSubmit: otpHandleSubmit,
    formState: { errors: otpErrors },
    setError,
  } = useForm();

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
          <TextField fullWidth type="password" />
        </FormStyle>
        {otpErrors?.otp?.message && (
          <Typography color={"red"} marginTop={2}>
            {otpErrors?.otp?.message}
          </Typography>
        )}
        <FormStyle sx={{ width: "100%" }}>
          <TextField fullWidth type="password" />
        </FormStyle>
        {otpErrors?.otp?.message && (
          <Typography color={"red"} marginTop={2}>
            {otpErrors?.otp?.message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ paddingTop: 0 }}>
        <FormStyle sx={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            // onClick={otpHandleSubmit(checkOtp)}
          >
            Change Password
          </Button>
        </FormStyle>
      </DialogActions>
    </Dialog>
  );
}

export default OTPDialog;
