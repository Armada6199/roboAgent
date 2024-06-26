// etc
import { Box, styled } from "@mui/material";
import InfoCard from "./InfoCard";
import {
  AiFillAndroid,
  AiFillApple,
  AiFillWindows,
  AiFillBug,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";

// info card item list
const items = [
  {
    id: "green",
    icon: <AiFillAndroid />,
    count: "714k",
    title: "Current Tickets",
  },
  { id: "blue", icon: <AiFillApple />, count: "15k", title: "Users Online" },
  {
    id: "yellow",
    icon: <AiFillWindows />,
    count: "1.5k",
    title: "Automation Handeled Tickets",
  },
  {
    id: "maroon",
    icon: <AiFillBug />,
    count: "234",
    title: "Total active Issues",
  },
];

const ContainerStyle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(7),
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "repeat( auto-fit, minmax(200px, 1fr) )",
}));

const InfoCards = () => {
  const { t } = useTranslation();
  return (
    <ContainerStyle>
      {items.map((el) => (
        <InfoCard
          key={el.id}
          colorId={el.id}
          icon={el.icon}
          amount={el.count}
          title={t(`dashboard.${el.title}`)}
        />
      ))}
    </ContainerStyle>
  );
};

export default InfoCards;
