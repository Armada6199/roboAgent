import CssBaseline from "@material-ui/core/CssBaseline";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { AlertProvider } from "src/hooks/Context/AlertContext";
import LoginProvider from "src/hooks/Context/LoginInfoContext";
import ThemeContextProvider from "src/hooks/Context/ThemeContext";
function Providers({ children }) {
  return (
    <LoginProvider>
      <ThemeContextProvider>
        <CssBaseline />
        {/* <I18nextProvider i18n={i18next}> */}
        <AlertProvider>{children}</AlertProvider>
        {/* </I18nextProvider> */}
      </ThemeContextProvider>
    </LoginProvider>
  );
}

export default Providers;
