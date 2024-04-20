import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import FormStyle from "src/styles/styles";
import { HandelRegularHit } from "src/utils/HitHandiling";
import AxiosHit from "src/utils/api/AxiosHit";
import { handleFetchAuthorities } from "src/utils/users/api/users";
import ServicesList from "../services/ServicesList";
const FinalRegister = ({ handleNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const setAlertInfo = useUpdateAlert();
  const [selectedRole, setSelectedRole] = useState("");
  const [authorities, setAuthorities] = useState([]);

  // const loginUpdate = useUpdateLoginInfo()
  const userRoles = [
    { value: "ADMIN", title: "Admin" },
    { value: "l2_team_lead", title: "L2 Team Lead" },
    { value: "l1_team_lead", title: "L1 Team lead" },
    { value: "l1_member", title: "L1 Member" },
    { value: "l2_member", title: "L2 Member" },
  ];
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const [userAuths, setUserAuths] = useState([]);
  function handleAddUserAuth(authId) {
    const foundAuth = userAuths.some((auth) => auth.authId !== authId);
    if (foundAuth) {
      const newAuths = userAuths.filter((auth) => auth.authId !== authId);
      setUserAuths(newAuths);
    } else {
      setUserAuths((prev) => [...prev, authId]);
    }
  }
  useEffect(() => {
    handleFetchAuthorities(setAuthorities);
  }, []);
  // submit
  const onSubmit = async (data) => {
    data["phoneNumber"] = phoneNumber;
    let hitResult = await AxiosHit({
      method: "post",
      url: "users/signup",
      data: data,
    });
    // hitResult = {...hitResult,redirectTo:"/"}
    handleNext();
    HandelRegularHit({ hitResult: hitResult, setAlertInfo, values: data });
  };
  useEffect(() => {
    handleFetchAuthorities(setAuthorities);
  }, []);
  return (
    <Grid container item gap={4}>
      <Grid container item gap={4} justifyContent={"center"}>
        <Grid item xs={12} textAlign={"center"}>
          <Typography variant="h6">Choose User Role</Typography>
        </Grid>
        {userRoles.map((role) => (
          <Grid item key={role.value}>
            <Button
              fullWidth
              variant={role.value == selectedRole ? "contained" : "outlined"}
              onClick={() => setSelectedRole(role.value)}
            >
              {role.title}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid container item gap={4} justifyContent={"center"}>
        <Grid item xs={12} textAlign={"center"}>
          <Typography variant="h6">Choose User Authorities</Typography>
        </Grid>
        <ServicesList
          authorities={authorities}
          handleAddUserAuth={handleAddUserAuth}
        />
      </Grid>
      {/* submit */}
      <Grid item xs={12} md={8}>
        <FormStyle>
          <Button fullWidth type="submit" variant="contained" disableElevation>
            Submit
          </Button>
        </FormStyle>
      </Grid>
    </Grid>
  );
};

export default FinalRegister;
