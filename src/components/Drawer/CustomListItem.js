import { NavLink } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { styled } from "@mui/material";

const usestyles = makeStyles((theme) => ({
  activeClass: {
    color: `rgb(0, 123, 85) !important`,
    backgroundColor: "rgba(0, 171, 85, 0.08)",
    borderRight: `3px solid rgb(0, 123, 85)`,
    "& .MuiTypography-subtitle1": {
      fontWeight: 600,
    },
  },
}));

const ListItemStyle = styled(ListItem)(() => ({
  padding: 0,
}));

const CustomLinkStyle = styled(NavLink)(({ theme }) => ({
  width: "100%",
  padding: "8px 8px 8px 32px",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: theme.palette.gray.main,

  "& .MuiListItemIcon-root": {
    minWidth: "auto",
    marginRight: theme.spacing(2),
    color: "inherit",
    fontSize: 18,
  },
  "& h6": {
    fontSize: 15,
    fontWeight: 400,
  },
}));

const CustomListItem = (props) => {
  const classes = usestyles();

  return (
    <ListItemStyle button onClick={props.onClick}>
      <CustomLinkStyle to={props.path} activeclassname={classes.activeClass}>
        <ListItemIcon>{props.icon}</ListItemIcon>

        <Typography variant="subtitle1" component="h6">
          {props.title}
        </Typography>
      </CustomLinkStyle>
    </ListItemStyle>
  );
};

export default CustomListItem;

//<ListItemText primary={props.title} />
