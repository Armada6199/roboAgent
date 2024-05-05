import { useContext, useState } from "react";

import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";

// icons
import { BiSearch } from "react-icons/bi";
import { RiMenu3Line } from "react-icons/ri";

// components
import { styled } from "@mui/material";
import Notifications from "src/components/layout/MainHeader/Notifications";
import LanguageSelector from "src/components/layout/MainHeader/SelectLanguage";
import UserMenu from "src/components/layout/MainHeader/UserMenu";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";
import { drawerWidth } from "../DashboardLayout";
import DarkModeSelector from "./DarkModeSelector";
const AppBarStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  backgroundColor: "rgba(255, 255, 255, 0.72)",
  color: "#333333",
  [theme.breakpoints.up("sm")]: {
    width: `calc(100% - ${drawerWidth}px)`,
    flexShrink: 0,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignContent: "flex-start",
  alignItems: "center",
}));

const ContainerStyle = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1),
  gridAutoFlow: "column",
}));

const ToggleButtonStyle = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const MainHeader = (props) => {
  const [showLang, setShowLang] = useState(null);
  const [showNotification, setShowNotification] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(null);

  // open and close lang menu
  const handleOpenLang = (e) => {
    setShowLang(e.currentTarget);
  };
  const handleCloseLang = (e) => {
    setShowLang(null);
  };

  // notifications
  const handleOpenNotification = (e) => setShowNotification(e.currentTarget);
  const handleCloseNotification = () => setShowNotification(null);

  // User Menu
  const handleOpenUserMenu = (e) => setShowUserMenu(e.currentTarget);
  const handleCloseUserMenu = () => setShowUserMenu(null);
  const { loginData } = useContext(LoginContext);
  console.log(loginData.isLoggedIn);
  if (loginData.isLoggedIn) {
    return (
      <AppBarStyle position="fixed">
        <ToolbarStyle>
          {/* Left side's items */}
          <ContainerStyle>
            <ToggleButtonStyle
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={props.onClick}
            >
              <RiMenu3Line />
            </ToggleButtonStyle>

            <IconButton aria-label="search">
              <BiSearch fontSize="small" />
            </IconButton>
          </ContainerStyle>

          {/* Right side's items */}
          <ContainerStyle>
            {/* Language selector */}
            <LanguageSelector
              anchorEl={showLang}
              onOpen={handleOpenLang}
              onClose={handleCloseLang}
            />
            {/* Notification */}

            {/* <Notifications
              anchorEl={showNotification}
              onOpen={handleOpenNotification}
              onClose={handleCloseNotification}
            />  */}
            {/* User Avatar */}
            <UserMenu
              anchorEl={showUserMenu}
              onOpen={handleOpenUserMenu}
              onClose={handleCloseUserMenu}
            />
          </ContainerStyle>
        </ToolbarStyle>
      </AppBarStyle>
    );
  } else {
    return (
      <AppBarStyle position="fixed">
        <ToolbarStyle>
          {/* Left side's items */}
          <ContainerStyle>
            <ToggleButtonStyle
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={props.onClick}
            >
              <RiMenu3Line />
            </ToggleButtonStyle>
          </ContainerStyle>

          {/* Right side's items */}
          <ContainerStyle>
            {/* Language selector */}
            {/* <DarkModeSelector /> */}
            {/* <LanguageSelector
              anchorEl={showLang}
              onOpen={handleOpenLang}
              onClose={handleCloseLang}
            /> */}
          </ContainerStyle>
        </ToolbarStyle>
      </AppBarStyle>
    );
  }
};

export default MainHeader;
