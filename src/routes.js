import { Navigate, redirect, useNavigate } from "react-router-dom";

// components
import DashboardLayout from "src/components/layout/DashboardLayout";
import ServicesGetAnswer from "src/pages/services/Page/ServicesGetAnswer";
import ServicesList from "src/pages/services/Page/ServicesList";
import ErrorPage from "src/pages/common/404";
import Login from "src/pages/auth/login/Login";
import Blog from "./pages/Blog/Blog";
import Dashboard from "./pages/Dashboard/Dashboard";
import User from "./components/User/User";
import Register from "./pages/auth/register/Register";
import { useRoutes } from "react-router-dom/dist";
import { useContext } from "react";
import { LoginContext } from "./hooks/Context/LoginInfoContext";
import SomethingWentWrongError from "./pages/common/500";
import { Services } from "./pages/services/Schema/ServicesSchema";
const allowedPages = {
  usersTable: {
    allowedRoles: ["ADMIN", "TEAM_LEAD"],
  },
  dashboard: {
    allowedRoles: ["ADMIN", "TEAM_LEAD", "MEMBER"],
  },
  register: {
    allowedRoles: ["ADMIN"],
  },
  services: {
    allowedRoles: ["ADMIN", "TEAM_LEAD", "MEMBER"],
  },
};
const Routes = () => {
  const { loginData } = useContext(LoginContext);
  console.log(loginData.isLoggedIn);
  const navigate = useNavigate();

  const pageRouts = [
    {
      // default
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: loginData.isLoggedIn ? (
            <Navigate to="/dash/dashboard" />
          ) : (
            <Navigate to="/auth/login" />
          ),
        },
        { path: "*", element: <ErrorPage /> },
      ],
    },

    // auth
    {
      path: "auth",
      element: loginData.isLoggedIn ? (
        <Navigate to="/dash/dashboard" />
      ) : (
        <DashboardLayout />
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "*", element: <ErrorPage /> },
        { path: "", element: <ErrorPage /> },
      ],
    },
    // dash
    {
      path: "dash",
      element: loginData.isLoggedIn ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/auth/login" />
      ),
      children: [
        { path: "Dashboard", element: <Dashboard /> },
        {
          path: "user",
          element: allowedPages.usersTable.allowedRoles.includes(
            loginData.role
          ) ? (
            <User />
          ) : (
            <Navigate to="/dash/dashboard" />
          ),
        },
        { path: "error", element: <SomethingWentWrongError /> },
        {
          path: "services",
          children: [
            { path: "", element: <ServicesList /> },
            { path: "getAnswer/:servicename", element: <ServicesGetAnswer /> },
          ],
        },
        {
          path: "register",
          element: allowedPages.register.allowedRoles.includes(
            loginData.role
          ) ? (
            <Register />
          ) : (
            <Navigate to="/dash/dashboard" />
          ),
        },
        { path: "blog", element: <Blog /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ];

  const routing = useRoutes(pageRouts);
  return <>{routing}</>;
};
export default Routes;
