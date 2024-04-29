import { useTranslation } from "react-i18next";
import "./App.css";
import Providers from "./components/Providers";
import Routes from "./routes";
const App = () => {
  const { i18n } = useTranslation();

  return (
    <Providers>
      <Routes />
    </Providers>
  );
};
export default App;
