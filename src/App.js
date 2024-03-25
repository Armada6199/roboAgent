import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { I18nextProvider } from "react-i18next";
import "./App.css";
import { AlertProvider } from "./hooks/Context/AlertContext";
import {
  LoginInfoProvider,
  useDarkMode,
} from "./hooks/Context/LoginInfoContext";
import { i18nextInit } from "./hooks/Context/Translations/i18nextInit";
import Routes from "./routes";
import { darkTheme, theme } from "./theme";
const App = () => {
  const darkMode = useDarkMode();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <CssBaseline />
      <LoginInfoProvider>
        <AlertProvider>
          <I18nextProvider i18n={i18nextInit}>
            <Routes />
          </I18nextProvider>
        </AlertProvider>
      </LoginInfoProvider>
    </ThemeProvider>
  );
};

export default App;
