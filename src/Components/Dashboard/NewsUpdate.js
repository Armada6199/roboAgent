import { Link as RouterLink } from "react-router-dom";
//import { styled } from "@material-ui/styles";
import { Box, Button, Divider } from "@material-ui/core";
import DashCard from "./DashCard";
import DashCardHeader from "./DashCardHeader";

// icon & images
import { GrFormNext } from "react-icons/gr";
import coverImg_1 from "/assets/Core/Images/newsList/cover_1.jpg";
import coverImg_2 from "src/Core/Images/newsList/cover_2.jpg";
import coverImg_3 from "src/Core/Images/newsList/cover_3.jpg";
import coverImg_4 from "src/Core/Images/newsList/cover_4.jpg";
import coverImg_5 from "src/Core/Images/newsList/cover_5.jpg";
import NewsUpdateItem from "./NewsUpdateItem";

// News List
const loremText = `New Update for Employees that has Borders numbers can accept the new ET`;
const VisasText = `Seasonal visas is allowed after 2 weeks `;

const newsList = [
  {
    title: "Employee Transfeer",
    subtitle: loremText,
    photo: coverImg_1,
    postingTime: "about 12 hours",
  },
  {
    title: "Visas",
    subtitle: VisasText,
    photo: coverImg_2,
    postingTime: "about 2 hours",
  },
  {
    title: "Dynamic Identity Officer",
    subtitle: loremText,
    photo: coverImg_3,
    postingTime: "about 7 hours",
  },
  {
    title: "Chief Program Planner",
    subtitle: loremText,
    photo: coverImg_4,
    postingTime: "about 12 hours",
  },
  {
    title: "Senior Implementation Manager",
    subtitle: loremText,
    photo: coverImg_5,
    postingTime: "about 10 hours",
  },
];

const NewsUpdate = () => {
  return (
    <DashCard>
      <DashCardHeader title="Releases" />

      {/* Main Content */}

      <Box
        overflow="auto"
        sx={{
          padding: { xs: 2, sm: 3 },
        }}
      >
        {newsList.map((news) => (
          <NewsUpdateItem
            key={news.title}
            title={news.title}
            subtitle={news.subtitle}
            photo={news.photo}
            postingTime={news.postingTime}
          />
        ))}
      </Box>

      {/* footer */}

      <Divider />
      <Box
        sx={{
          py: 2,
          px: 3,
          textAlign: "right",
        }}
      >
        <Button
          to="/"
          component={RouterLink}
          size="small"
          color="inherit"
          endIcon={<GrFormNext />}
        >
          View All
        </Button>
      </Box>
    </DashCard>
  );
};

export default NewsUpdate;
