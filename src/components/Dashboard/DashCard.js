import { Card } from "@material-ui/core";
import { styled } from "@mui/material";

const CardStyle = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow:
    "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
}));

const DashCard = (props) => {
  return <CardStyle>{props.children}</CardStyle>;
};

export default DashCard;
