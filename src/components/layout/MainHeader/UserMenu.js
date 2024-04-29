// icons
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Typography,
} from "@material-ui/core";

// icons & images
import { Button, styled } from "@mui/material";
import Menu from "@mui/material/Menu";
import { useContext } from "react";
import { RiHome4Fill, RiSettings3Fill, RiUserFill } from "react-icons/ri";
import userAvatar from "src/assets/Images/GreenQiwa.jpg";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";

const GrayMainText = styled("div")(({ theme }) => ({
  color: theme.palette.gray.main,
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    maxWidth: 225,
    width: "90%",
    boxShadow: `0 2px 10px -5px ${theme.palette.green.darker}`,
  },
}));
const BoxStyle = styled(Box)(({ theme }) => ({
  padding: "10px 16px",
}));

const AvatarButtonStyle = styled(IconButton)(({ theme }) => ({
  padding: "2px 6px",
  "& .MuiAvatar-root": {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const LinkStyle = styled(Link)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  padding: theme.spacing(1),
  color: theme.palette.common.black,
  fontSize: theme.spacing(3),
  fontWeight: 500,
  border: "1px solid #333",
  borderRadius: theme.spacing(1),
  transition: "background 0.25s ease-in",
  "&:hover": {
    backgroundColor: theme.palette.gray.lighter,
    underline: "none",
  },
}));

const MenuItemStyle = styled(MenuItem)(({ theme }) => ({
  padding: 0,
  "& a": {
    width: "100%",
    padding: "8px 20px",
    display: "flex",
    alignItems: "center",
    fontSize: 18,
    color: theme.palette.common.black,
    textDecoration: "none",
    "& svg": {
      marginRight: theme.spacing(2),
      fontSize: theme.spacing(3),
    },
  },
}));

// List of links
const links = [
  {
    id: "l1",
    path: "/home",
    title: "Home",
    icon: <RiHome4Fill />,
  },
  {
    id: "l2",
    path: "/profile",
    title: "Profile",
    icon: <RiUserFill />,
  },
  {
    id: "l3",
    path: "/settings",
    title: "Settings",
    icon: <RiSettings3Fill />,
  },
];

const UserMenu = (props) => {
  const { loginData, logout } = useContext(LoginContext);
  console.log("LoginInfo", loginData);
  return (
    <>
      <AvatarButtonStyle
        aria-controls="notifications"
        aria-haspopup="true"
        onClick={props.onOpen}
      >
        <Avatar src={userAvatar} alt="User Name">
          JD
        </Avatar>
      </AvatarButtonStyle>

      <StyledMenu
        id="notificationsMenu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.onClose}
      >
        {/* Header */}
        <BoxStyle>
          <Typography variant="h6" component="h3">
            {loginData.firstName ? loginData.firstName : ""}
          </Typography>
          <GrayMainText variant="body2" component="p">
            {loginData.email}
          </GrayMainText>
        </BoxStyle>

        <Divider />

        {/* list of links */}
        {links.map((el) => (
          <MenuItemStyle key={el.id}>
            <a href={el.path}>
              {el.icon}
              <Box component="span">{el.title}</Box>
            </a>
          </MenuItemStyle>
        ))}

        {/* Footer */}
        <BoxStyle>
          <Button variant="outlined" onClick={logout} fullWidth>
            Logout
          </Button>
        </BoxStyle>
      </StyledMenu>
    </>
  );
};

export default UserMenu;
