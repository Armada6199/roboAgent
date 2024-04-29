import { Grid } from "@material-ui/core";
import { styled } from "@mui/material";
import { Services } from "../Schema/ServicesSchema";
import ServicesListItem from "./utils/ServicesListItem";
// grid style
const GridStyle = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const ServicesList = () => {
  const servicesComponent = [];
  Object.keys(Services).forEach((key) => {
    console.log("Siminz ===>", key);
    servicesComponent.push(
      <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
        <ServicesListItem key={key} service={key} value={Services[key]} />
      </Grid>
    );
  });
  console.log("Services ===> ", Services);
  console.log("servicesComponent ===> ", servicesComponent);
  return (
    <GridStyle container spacing={6}>
      {servicesComponent.map((e) => {
        return e;
      })}
    </GridStyle>
  );
};

export default ServicesList;
