import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import {
  handleFetchAuthorities,
  handleFetchServiceList,
  handleSubmitUserFinalRegistration,
} from "src/utils/users/api/users";
export async function handleFinalRegistration(
  userRole,
  userTeam,
  userServices,
  userMainService,
  userId
) {
  try {
    const rolePromise = axios.post(`/user-roles/${userId}/roles/${userRole}`);
    const mainServicePromise = axios.post(
      `/service/${userId}/service/${userMainService}`
    );
    const servicePromise = axios.post(`/api/user-auth`, userServices);
    const teamPromise = axios.post(`/userTeam/${userId}/${userTeam}`);
    Promise.all([
      rolePromise,
      mainServicePromise,
      servicePromise,
      teamPromise,
    ]).then((values) => {
      console.log(values);
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
const FinalRegister = ({ handleBack, handleNext }) => {
  const setAlertInfo = useUpdateAlert();
  const [selectedRole, setSelectedRole] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedAuthorities, setSelectedAuthorities] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const userRoles = [
    { value: "team_lead", title: "Team Lead" },
    { value: "member", title: "Member" },
  ];
  const teams = ["L1", "L2"];
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    handleFetchAuthorities({
      setAuthorities,
      requestAction: "GET_ALL_AUTHORITIES",
    });
    handleFetchServiceList({
      setServiceList,
      requestAction: "SET_SERVICE_LIST",
    });
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const values = typeof value === "string" ? value.split(",") : value;
    const authArr = [];
    values.map((value) => {
      const newObj = { authId: value };
      authArr.push(newObj);
    });
    setSelectedAuthorities(authArr);
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(() =>
        handleNext({
          role: selectedRole,
          team: selectedTeam,
          roboAuthorities: selectedAuthorities,
          service: selectedService,
        })
      )}
    >
      <Grid container item gap={4}>
        <Grid container item>
          <Grid container item gap={4} xs={12} md={6} justifyContent={"center"}>
            <Grid item xs={12} textAlign={"center"}>
              <Typography variant="h5">Choose user role </Typography>
            </Grid>
            {userRoles.map((role) => (
              <Grid item key={role.value}>
                <Button
                  fullWidth
                  variant={
                    role.value == selectedRole ? "contained" : "outlined"
                  }
                  onClick={() => setSelectedRole(role.value)}
                >
                  {role.title}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid container item xs={12} md={6} gap={4} justifyContent={"center"}>
            <Grid item xs={12} textAlign={"center"}>
              <Typography variant="h5">Choose user team </Typography>
            </Grid>
            {teams.map((team) => (
              <Grid item key={team}>
                <Button
                  fullWidth
                  variant={team == selectedTeam ? "contained" : "outlined"}
                  onClick={() => setSelectedTeam(team)}
                >
                  {team}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container item gap={4} justifyContent={"center"}>
          <Grid container item spacing={8}>
            <Grid container item xs={12} md={6} gap={4}>
              <Grid item xs={12} textAlign={"center"}>
                <Typography variant="h5">Choose User Services</Typography>
              </Grid>
              <FormControl fullWidth>
                <InputLabel>Services</InputLabel>
                <Select
                  value={selectedAuthorities.map((e) => e.authId)}
                  label="Services"
                  multiple
                  onChange={handleChange}
                >
                  {authorities.map((auth) => (
                    <MenuItem value={auth.authId}>
                      {auth.name.split("_").join(" ")}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={12} md={6} gap={4}>
              <Grid item xs={12} textAlign={"center"}>
                <Typography variant="h5">Choose User Main Service</Typography>
              </Grid>
              <FormControl fullWidth>
                <InputLabel>Service</InputLabel>
                <Select
                  value={selectedService}
                  label="Service"
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  {serviceList.map((service) => (
                    <MenuItem value={service.service}>
                      {service.service}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent={"flex-end"} spacing={4}>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ p: 2 }}
              onClick={handleBack}
              disableElevation
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ p: 2 }}
              disableElevation
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default FinalRegister;
