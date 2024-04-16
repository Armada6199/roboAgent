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
import { styled } from "@mui/material";
import Menu from "@mui/material/Menu";
import { useContext } from "react";
import { RiHome4Fill, RiSettings3Fill, RiUserFill } from "react-icons/ri";
import userAvatar from "src/assets/Images/GreenQiwa.jpg";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";

const GrayMainText = styled("div")(({ theme }) => ({
  color: theme.palette.gray.main,
}));

const GrayDarkText = styled("div")(({ theme }) => ({
  color: theme.palette.gray.dark,
}));

const ListHeader = styled("div")(({ theme }) => ({
  color: theme.palette.gray.main,
  margin: "8px 0",
  paddingLeft: theme.spacing(2),
  letterSpacing: 1,
  fontSize: theme.spacing(2),
  fontWeight: 600,
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
    icon: <RiSettings3Fill st />,
  },
];

const UserMenu = (props) => {
  const { loginData } = useContext(LoginContext);
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
            {!!loginData.userInfo.userName
              ? loginData.userInfo.userName
              : "" + loginData.userInfo.email.split("@")[0]}
          </Typography>
          <GrayMainText variant="body2" component="p">
            {loginData.userInfo.email}
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
          <LinkStyle
            href="/"
            underline="none"
            onClick={() => {
              localStorage.clear();
            }}
          >
            Logout
          </LinkStyle>
        </BoxStyle>
      </StyledMenu>
    </>
  );
};

export default UserMenu;
