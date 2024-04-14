import { Grid } from "@mui/material";
import { Helmet } from "react-helmet";
import UserTable from "./UserTable";

const User = () => {
  // media queries

  return (
    <>
      <Helmet>
        <title>Users | RoboAgent</title>
      </Helmet>

      <Grid container bgcolor={"red"}>
        <UserTable />
      </Grid>
    </>
  );
};

export default User;
