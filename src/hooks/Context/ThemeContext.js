import { ThemeProvider } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "src/styles/theme";

export const themeContext = createContext();
const ThemeContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [themeStyles, setThemeStyles] = useState(lightTheme);
  useEffect(() => {
    setThemeStyles(currentTheme === "light" ? lightTheme : darkTheme);
    console.log(currentTheme);
  }, [currentTheme]);

  return (
    <themeContext.Provider
      value={{ currentTheme, setCurrentTheme, themeStyles }}
    >
      {console.log(themeStyles)}
      <ThemeProvider theme={themeStyles}>{children}</ThemeProvider>;
    </themeContext.Provider>
  );
};
export default ThemeContextProvider;
