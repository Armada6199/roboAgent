import { Grid, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Helmet } from "react-helmet";
import ChartCurrentSubject from "src/components/Dashboard/ChartCurrentSubject";
import ChartSiteVisits from "src/components/Dashboard/ChartSiteVisits";
import ConversionRate from "src/components/Dashboard/ConversionRate";
import CurrentVisits from "src/components/Dashboard/CurrentVisits";
import InfoCards from "src/components/Dashboard/InfoCards";
import NewsUpdate from "src/components/Dashboard/NewsUpdate";
import OrderTimeline from "src/components/Dashboard/OrderTimeline";
import SocialTraffic from "src/components/Dashboard/SocialTraffic";
import Tasks from "src/components/Dashboard/Tasks";

// grid container style
const GridContainerStyle = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Dashboard = () => {
  console.log("SSSS=> Dashboard");
  return (
    <>
      <Helmet>
        <title>Dashboard | RoboAgent</title>
      </Helmet>
      {/*
      <Typography variant="h6" component="h2">
        Hi, Welcome in RoboAgent.
      </Typography> */}

      {/* Info Cards */}
      <InfoCards />

      <GridContainerStyle container spacing={3}>
        {/* Site visits chart */}
        <Grid item xs={12} md={6} lg={8}>
          <ChartSiteVisits />
        </Grid>

        {/* Current Visits */}
        <Grid item xs={12} md={6} lg={4}>
          <CurrentVisits />
        </Grid>

        {/* Conversion Rates */}
        <Grid item xs={12} md={6} lg={8}>
          <ConversionRate />
        </Grid>

        {/* Current Subject */}
        <Grid item xs={12} md={6} lg={4}>
          <ChartCurrentSubject />
        </Grid>

        {/* News Update */}
        <Grid item xs={12} md={6} lg={8}>
          <NewsUpdate />
        </Grid>

        {/* Order Timeline */}
        <Grid item xs={12} md={6} lg={4}>
          <OrderTimeline />
        </Grid>

        {/* Traffic by Site */}
        <Grid item xs={12} md={6} lg={4}>
          <SocialTraffic />
        </Grid>

        {/* Traffic by Site */}
        <Grid item xs={12} md={6} lg={8}>
          <Tasks />
        </Grid>
      </GridContainerStyle>
    </>
  );
};

export default Dashboard;