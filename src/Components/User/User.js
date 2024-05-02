import { Grid } from "@mui/material";
import { Helmet } from "react-helmet";
import UserTable from "./UserTable";
import { useContext } from "react";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";
import { useNavigate } from "react-router";

const User = () => {
  // media queries
  const { loginData } = useContext(LoginContext);
  const navigate = useNavigate();
  if (loginData.role == "ADMIN" || loginData.role == "TEAM_LEAD") {
    return (
      <>
        <Helmet>
          <title>Users | RoboAgent</title>
        </Helmet>

        <Grid container>
          <UserTable />
        </Grid>
      </>
    );
  }
  return null;
};

export default User;
