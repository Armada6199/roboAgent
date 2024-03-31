import { Navigate } from "react-router-dom";

// components
import DashboardLayout from "src/components/Layout/DashboardLayout";
import ServicesGetAnswer from "src/pages/Auth/Services/Page/ServicesGetAnswer";
import ServicesList from "src/pages/Auth/Services/Page/ServicesList";
import ErrorPage from "src/pages/Common/404";
import Login from "src/pages/Public/Login/Pages/Login";
import Blog from "./components/Blog/Blog";
import Dashboard from "./components/Dashboard/Dashboard";
import User from "./components/User/User";
import Register from "./pages/Public/Register/Pages/Register";
import { useRoutes } from "react-router-dom/dist";
import { useContext } from "react";
import { LoginContext } from "./hooks/Context/LoginInfoContext";

const Routes = () => {
  const { loginData } = useContext(LoginContext);
  console.log(loginData.isLoggedIn);
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
        { path: "user", element: <User /> },
        {
          path: "services",
          children: [
            { path: "", element: <ServicesList /> },
            { path: "getAnswer", element: <ServicesGetAnswer /> },
          ],
        },
        { path: "register", element: <Register /> },
        { path: "blog", element: <Blog /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ];

  const routing = useRoutes(pageRouts);
  return <>{routing}</>;
};
export default Routes;
