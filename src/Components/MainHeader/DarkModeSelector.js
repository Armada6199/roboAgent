import { Box } from "@material-ui/core";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import {
  ACTIONS,
  useDarkMode,
  useUpdateDarkMode,
} from "src/hooks/Context/LoginInfoContext";

const DarkModeSelector = (props) => {
  const darkModeUpdate = useUpdateDarkMode();
  const darkMode = useDarkMode().darkMode;
  console.log("darkMode ===> ", darkMode);
  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
      }}
      onClick={(e) => {
        console.log("click");
        console.log(darkMode);
        darkModeUpdate({
          type: ACTIONS.CHNG_MODE,
          payload: { darkMode: !darkMode },
        });
      }}
      style={{ cursor: "pointer" }}
      className=".MuiBox-root .MuiBox-root-489"
    >
      {darkMode ? "Dark mode" : "Light mode"}
      <IconButton sx={{ ml: 1 }} color="inherit">
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default DarkModeSelector;
