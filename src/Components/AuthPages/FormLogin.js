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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import { useUpdateLoginInfo } from "src/hooks/Context/LoginInfoContext";
import FormStyle from "src/styles/styles";
import AxiosHit from "src/utils/api/AxiosHit";
import { HandelRegularHit } from "src/utils/HitHandiling";

const FormLogin = () => {
  const [showPassword, setShowPassord] = useState(false);
  const [remember, setRemember] = useState(true);
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

  // prevent Default
  const preventDefault = (e) => e.preventDefault();

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
  // couldn't make it work

  return (
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

        <Link href="#" onClick={preventDefault} underline="always">
          Forgot password?
        </Link>
      </Box>

      <Button type="submit" variant="contained" disableElevation>
        Login
      </Button>
    </FormStyle>
  );
};

export default FormLogin;
