import { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { themeContext } from "src/hooks/Context/ThemeContext";
import DashCard from "./DashCard";
import DashCardHeader from "./DashCardHeader";
import { styled } from "@mui/material";

const DivStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(1),
  "& .apexcharts-legend": {
    borderTop: `1px solid ${theme.palette.gray.light}`,
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  "& .apexcharts-tooltip": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    border: `1px solid ${theme.palette.gray.light}`,
    borderRadius: 25,
    paddingTop: 2,
  },
}));
const SERIES_DATA = [4344, 5435, 1443, 4443];

const CurrentVisits = () => {
  const { themeStyles } = useContext(themeContext);
  console.log(themeStyles);
  const chartOptions = {
    labels: ["Employee Transfeer", "Work Permits", "Visas", "User Managments"],
    stroke: { colors: [themeStyles.palette.background.paper] },
    colors: [
      themeStyles.palette.success.main,
      themeStyles.palette.info.main,
      themeStyles.palette.warning.light,
      themeStyles.palette.error.main,
    ],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        title: {
          formatter: (seriesName) => `#${seriesName}`,
        },
      },
    },
  };

  return (
    <DashCard>
      <DashCardHeader title="Current Visits" />

      <DivStyle>
        <ReactApexChart
          type="pie"
          series={SERIES_DATA}
          options={chartOptions}
          height={350}
        />
      </DivStyle>
    </DashCard>
  );
};

export default CurrentVisits;