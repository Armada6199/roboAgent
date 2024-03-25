import {
  IconButton,
  styled,
  Menu,
  MenuItem,
  ListItemText,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import {
  useUpdateLangInfo,
  useLangInfo,
  ACTIONS,
} from "src/hooks/Context/LoginInfoContext";

// images
import AR_Flag from "src/Core/Images/ic_flag_ar.svg";
import EN_Flag from "src/Core/Images/ic_flag_en.svg";
// import DE_Flag from "~/Core/Images/ic_flag_de.svg";
// import FR_Flag from "~/Core/Images/ic_flag_fr.svg";

// Menu styles
const StyledMenu = withStyles((theme) => ({
  paper: {
    minWidth: 175,
    boxShadow: `0 2px 10px -5px ${theme.palette.green.darker}`,
  },
}))((props) => (
  <Menu
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
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:active": {
      backgroundColor: theme.palette.green.light,
    },
    "& .MuiListItemText-primary": {
      marginLeft: theme.spacing(2.5),
      fontSize: theme.spacing(2.25),
    },
  },
}))(MenuItem);

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  padding: "12px 9px",
  "& img": {
    width: theme.spacing(3),
  },
}));

// Language list
const languages = [
  { src: <img src={AR_Flag} alt="Arabic" />, alt: "Arabic" },
  { src: <img src={EN_Flag} alt="English" />, alt: "English" },
  // { src: <img src={DE_Flag} alt="German" />},
  // { src: <img src={FR_Flag} alt="French" />},
];

const LanguageSelector = (props) => {
  const langUpdate = useUpdateLangInfo();
  const LangInfo = useLangInfo().langInfo;
  console.log("LangInfo ===> ", LangInfo);
  return (
    <>
      <IconButtonStyle
        aria-controls="language-selector"
        aria-haspopup="true"
        onClick={props.onOpen}
      >
        {!!LangInfo ? (
          <>
            {
              languages.filter((l) => {
                return l.alt === LangInfo;
              })[0].src
            }
          </>
        ) : (
          <>{languages[0].src}</>
        )}
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
              console.log("click");
              console.log(el.alt);
              langUpdate({
                type: ACTIONS.CHNG_LANG,
                payload: { langInfo: el.alt },
              });
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
