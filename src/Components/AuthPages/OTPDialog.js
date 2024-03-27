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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormStyle from "src/styles/styles";
function OTPDialog({ setOpen2, open2, sendEmail }) {
  const {
    register: otpRegister,
    handleSubmit: otpHandleSubmit,
    formState: { errors: otpErrors },
    setError,
  } = useForm();
  const [counter, setCounter] = useState(60);
  const checkOtp = (data) => {
    if (data.otp !== "0000") {
      setError("otp", { message: "OTP is not valid " });
    }
  };
  const startCounter = () => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev) return prev - 1;
      });
    }, 1000);
    return interval;
  };

  useEffect(() => {
    const interval = startCounter();
    return () => clearTimeout(interval);
  }, []);
  // useEffect(()=>{
  //   const interval = startCounter();
  //   return () => clearTimeout(interval);
  // },[resend])
  return (
    <Dialog
      fullWidth={true}
      open={open2}
      onClose={() => {
        setOpen2(false);
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
          OTP Verification
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ paddingX: 1, paddingY: 0 }}>
        <DialogContentText fontWeight={"bold"}>
          Please enter OTP sent to your email
        </DialogContentText>
        <FormStyle sx={{ width: "100%" }}>
          <TextField
            fullWidth
            {...otpRegister("otp", { required: "OTP is Required" })}
          />
        </FormStyle>
        {otpErrors?.otp?.message && (
          <Typography color={"red"} marginTop={2}>
            {otpErrors?.otp?.message}
          </Typography>
        )}
        <Box
          marginTop={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography>Haven't recieved the OTP ?</Typography>
          {!counter ? (
            <Button
              onClick={() => {
                sendEmail();
                setCounter(60);
              }}
              style={{ color: "#2e7d32", mx: 4 }}
            >
              Resend
            </Button>
          ) : (
            <Typography fontSize={14} marginLeft={1}>
              {counter}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ paddingTop: 0 }}>
        <FormStyle sx={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={otpHandleSubmit(checkOtp)}
          >
            Submit
          </Button>
        </FormStyle>
      </DialogActions>
    </Dialog>
  );
}

export default OTPDialog;
