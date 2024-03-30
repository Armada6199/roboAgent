import CssBaseline from "@material-ui/core/CssBaseline";
import { I18nextProvider } from "react-i18next";
import "./App.css";
import { AlertProvider } from "./hooks/Context/AlertContext";
import { LoginInfoProvider } from "./hooks/Context/LoginInfoContext";
import { i18nextInit } from "./hooks/i18nextInit";
import Routes from "./routes";
import ThemeContextProvider from "./hooks/Context/ThemeContext";
const App = () => {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <LoginInfoProvider>
        <AlertProvider>
          <I18nextProvider i18n={i18nextInit}>
            <Routes />
          </I18nextProvider>
        </AlertProvider>
      </LoginInfoProvider>
    </ThemeContextProvider>
  );
};

export default App;
