import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { handleFetchAuthorities } from "src/utils/users/api/users";
import ServicesListItem from "./utils/ServicesListItem";

const ServicesList = (props) => {
  const [authorities, setAuthorities] = useState([]);
  useEffect(() => {
    handleFetchAuthorities(setAuthorities, true);
  }, []);
  return (
    <Grid container item>
      {authorities.map((auth) => (
        <ServicesListItem key={auth.authId} auth={auth} />
      ))}
    </Grid>
  );
};

export default ServicesList;
