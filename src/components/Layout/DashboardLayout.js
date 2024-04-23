import { Box, Toolbar } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Outlet } from "react-router";
import ShowAlert from "src/components/ShowAlert";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";
import { styled } from "@mui/material";
import MainHeader from "./MainHeader/MainHeader";
import SideDrawer from "./SideDrawer";

export const drawerWidth = 240; // You'll need to define this value

const DrawerPaper = styled("div")(({ theme }) => ({
  width: drawerWidth,
  display: "grid",
  gridTemplateRows: "auto auto 1fr auto",
  // Add any other styles you need here
}));

const MainStyle = styled("main")(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  padding: theme.spacing(3),
}));

const DashboardLayout = (props) => {
  // window width
  const { loginData } = useContext(LoginContext);
  const { window } = props;
  const [toggleMenu, setToggleMenu] = useState(false);
  // const classes = usestyles();

  // toggle drawer
  const handleToggleDrawer = () => setToggleMenu(!toggleMenu);
  const handleToggleClose = () => setToggleMenu(false);

  // I don't know the work of container yet
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        {/* App Bar */}
        <MainHeader onClick={handleToggleDrawer} />

        {/* Drawer */}
        {loginData.isLoggedIn ? (
          <>
            <SideDrawer
              container={container}
              toggleMenu={toggleMenu}
              onClose={handleToggleClose}
              drawerPaper={<DrawerPaper />}
            />
          </>
        ) : (
          <></>
        )}

        {/* Content */}
        <MainStyle>
          <Toolbar />
          <ShowAlert />

          {/* Main parts */}
          <Outlet />
        </MainStyle>
      </Box>
    </React.Fragment>
  );
};

export default DashboardLayout;
