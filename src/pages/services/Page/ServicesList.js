import { Grid } from "@material-ui/core";
import { styled } from "@mui/material";
import { useContext } from "react";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";
import { Services } from "../Schema/ServicesSchema";
import ServicesListItem from "./utils/ServicesListItem";
// grid style
const GridStyle = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));
const ServicesList = () => {
  const { loginData } = useContext(LoginContext);
  if (loginData.role === "TEAM_LEAD" || loginData.role === "ADMIN") {
    return (
      <Grid container item spacing={4}>
        {Services.map((service) => (
          <Grid key={service.value} item xs={12} sm={6} md={4} lg={3}>
            <ServicesListItem service={service} />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return (
      <Grid container item spacing={4}>
        {Services.map((service) => {
          const showService = loginData.roboAuthorities.some((auth) =>
            service.allowedAuthorities.includes(auth.name)
          );
          return showService ? (
            <Grid key={service.value} item xs={12} sm={6} md={4} lg={3}>
              <ServicesListItem key={service.value} service={service} />
            </Grid>
          ) : service.allowedAuthorities[0] === "all" ? (
            <ServicesListItem key={service.value} service={service} />
          ) : null;
        })}
      </Grid>
    );
  }
};

export default ServicesList;
// console.log(
// loginData.roboAuthorities.some((auth) =>
//   service.allowedAuthorities.includes(auth.name)
// )
// );
