import { IconButton, ListItemText, Menu, MenuItem } from "@material-ui/core";
import { styled } from "@mui/material";

// images
import i18next from "i18next";
import AR_Flag from "src/assets/Images/ic_flag_ar.svg";
import EN_Flag from "src/assets/Images/ic_flag_en.svg";
// import DE_Flag from "~/Core/Images/ic_flag_de.svg";
// import FR_Flag from "~/Core/Images/ic_flag_fr.svg";

// Menu styles
const StyledMenu = styled(Menu)(({ theme }) => ({
  paper: {
    minWidth: 175,
    boxShadow: `0 2px 10px -5px ${theme.palette.green.darker}`,
  },
}));

// Usage
<StyledMenu
  elevation={0}
  getContentAnchorEl={null}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  // ...other props
/>;

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:active": {
    backgroundColor: theme.palette.green.light,
  },
  "& .MuiListItemText-primary": {
    marginLeft: theme.spacing(1),
    fontSize: theme.spacing(2),
  },
}));

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  padding: "12px 9px",
  "& img": {
    width: 28,
  },
}));

// Language list
const languages = [
  { src: <img src={AR_Flag} alt="Arabic" />, alt: "Arabic" },
  { src: <img src={EN_Flag} alt="English" />, alt: "English" },
];

const LanguageSelector = (props) => {
  console.log(i18next.language);

  return (
    <>
      <IconButtonStyle
        aria-controls="language-selector"
        aria-haspopup="true"
        onClick={props.onOpen}
      >
        {i18next.language == "en" ? languages[1].src : <>{languages[0].src}</>}
      </IconButtonStyle>

      <StyledMenu
        id="customized menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.onClose}
      >
        {languages.map((el) => (
          <StyledMenuItem
            key={el.alt}
            value={el.alt}
            onClick={(e) => {
              console.log(i18next.language);
              // i18next.changeLanguage("en");
              props.onClose(e);
            }}
          >
            {el.src}
            <ListItemText primary={el.alt} />
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default LanguageSelector;
