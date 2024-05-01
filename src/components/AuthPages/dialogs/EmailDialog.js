import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import FormStyle from "src/styles/styles";
import { handleVerifyEmail } from "src/utils/api/auth/otp";

function EmailDialog({ setOtpToken, setSnackbarData, handleNext, steps }) {
  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    formState: { errors: emailErrors },
  } = useForm();
  const setAlertInfo = useUpdateAlert();
  return (
    <Dialog
      fullWidth={true}
      open={steps == 1}
      //   onClose={handleB}
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
              handleVerifyEmail({
                email: data.email,
                handleNext,
                setAlertInfo,
                setOtpToken,
              })
            )}
          >
            Next
          </Button>
        </FormStyle>
      </DialogActions>
    </Dialog>
  );
}

export default EmailDialog;
