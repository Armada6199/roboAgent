import {
  Badge,
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { styled } from "@mui/material";

// icons
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaTruck, FaUser } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { HiBell, HiClock } from "react-icons/hi";
import { IoMailOpenSharp } from "react-icons/io5";
// styles

const GrayMainStyle = styled("div")(({ theme }) => ({
  color: theme.palette.gray.main,
}));

const ListHeaderStyle = styled("div")(({ theme }) => ({
  color: theme.palette.gray.main,
  margin: "8px 0",
  paddingLeft: theme.spacing(2),
  letterSpacing: 1,
  fontSize: theme.spacing(2),
  fontWeight: 600,
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  marginTop: 35,
  "& .MuiPaper-root": {
    minWidth: "250px",
    maxWidth: "400px",
    width: "90%",
    boxShadow: `0 2px 10px -5px ${theme.palette.green.darker}`,
  },
}));

const BadgeStyle = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.red.main,
    color: theme.palette.common.white,
    top: "-3px",
    fontSize: theme.spacing(2),
  },
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  padding: "10px 16px",
}));

const LinkStyle = styled(Link)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  padding: theme.spacing(1),
  color: theme.palette.green.dark,
  fontSize: theme.spacing(2),
  fontWeight: 500,
  borderRadius: theme.spacing(1),
  transition: "background 0.25s ease-in",
  "&:hover": {
    backgroundColor: theme.palette.green.light,
    underline: "none",
  },
}));

const MenuItemUnseenStyle = styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.palette.gray.lighter,
  padding: "16px 12px 16px 8px",
  display: "flex",
  alignItems: "center",
  whiteSpace: "break-spaces",
  "&:hover": {
    backgroundColor: theme.palette.gray.light,
  },
}));

const MenuItemSeenStyle = styled(MenuItem)(() => ({
  padding: "16px 12px 16px 8px",
  display: "flex",
  alignItems: "center",
  whiteSpace: "break-spaces",
}));

const MenuItemIconButtonStyle = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.gray.lighter,
  color: `#${Math.random().toString(16).substr(-6)}`,
}));

const MenuItemTimeStampStyle = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: theme.spacing(2),
  color: theme.palette.gray.main,
  margin: 0,
  marginTop: theme.spacing(1),
  "& span": {
    marginLeft: theme.spacing(1),
  },
}));

// List of notification
const notificationList = [
  {
    id: "n1",
    status: "unseen",
    avatar: <FiBox fontSize="small" />,
    mainText: "Your Answer has been Approved",
    subText: "waiting for completion",
    time: "about 12 hours",
  },
  {
    id: "n2",
    status: "seen",
    avatar: <BsFillChatDotsFill fontSize="small" />,
    mainText: "You have new message",
    subText: "5 unread messages",
    time: "1 day",
  },
  {
    id: "n3",
    status: "unseen",
    avatar: <FaUser fontSize="small" />,
    mainText: "Miss Veronica Walter",
    subText: "answered to your comment on the minimal",
    time: "about 4 hours",
  },
  {
    id: "n4",
    status: "seen",
    avatar: <IoMailOpenSharp fontSize="small" />,
    mainText: "You have new mail",
    subText: "sent from guido padberg",
    time: "2 days",
  },
  {
    id: "n5",
    status: "seen",
    avatar: <FaTruck fontSize="small" />,
    mainText: "Delivery processing",
    subText: "your Automation in progress",
    time: "3 days",
  },
];

const seenNotifications = notificationList.filter((el) => el.status === "seen");
const unSeenNotifications = notificationList.filter(
  (el) => el.status === "unseen"
);
const totalUnseenNotifications = unSeenNotifications.length;

const Notifications = (props) => {
  return (
    <>
      <IconButton
        aria-controls="notifications"
        aria-haspopup="true"
        onClick={props.onOpen}
      >
        <BadgeStyle badgeContent={totalUnseenNotifications}>
          <HiBell fontSize="small" />
        </BadgeStyle>
      </IconButton>

      <StyledMenu
        id="notificationsMenu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.onClose}
      >
        {/* Header */}
        <BoxStyle>
          <Typography variant="h6" component="h3">
            Notifications
          </Typography>
          <GrayMainStyle variant="body2" component="p">
            You have {totalUnseenNotifications} unread messages
          </GrayMainStyle>
          {/* <Typography
            variant="body2"
            component="p"
            className={classes.grayMain}
          >
            You have {totalUnseenNotifications} unread messages
          </Typography> */}
        </BoxStyle>

        <Divider />

        {/* Unseen Notifications */}
        <ListHeaderStyle variant="button" component="h4">
          NEW
        </ListHeaderStyle>
        {/* <Typography
          variant="button"
          component="h4"
          className={classes.listHeader}
        >
          NEW
        </Typography> */}

        {unSeenNotifications.map((el) => (
          <MenuItemUnseenStyle key={el.id}>
            <MenuItemIconButtonStyle>{el.avatar}</MenuItemIconButtonStyle>

            <Box>
              <Typography variant="body2" component="p">
                <strong>{el.mainText}</strong>{" "}
                <GrayMainStyle component={"span"}>{el.subText}</GrayMainStyle>
                {/* <span className={classes.grayMain}>{el.subText}</span> */}
              </Typography>

              <MenuItemTimeStampStyle variant="caption" component="p">
                <HiClock fontSize="small" />
                <span>{el.time}</span>
              </MenuItemTimeStampStyle>
            </Box>
          </MenuItemUnseenStyle>
        ))}

        {/* Seen Notifications */}
        <GrayMainStyle variant="button" component="h4">
          BEFORE THAT
        </GrayMainStyle>
        {/* <Typography
          variant="button"
          component="h4"
          className={classes.ListHeaderStyle}
        >
          BEFORE THAT
        </Typography> */}

        {seenNotifications.map((el) => (
          <MenuItemSeenStyle key={el.id}>
            <MenuItemIconButtonStyle>{el.avatar}</MenuItemIconButtonStyle>

            <Box>
              <Typography variant="body2" component="p">
                <strong>{el.mainText}</strong>{" "}
                <GrayMainStyle component={"span"}>{el.subText}</GrayMainStyle>
                {/* <span className={classes.grayMain}>{el.subText}</span> */}
              </Typography>

              <MenuItemTimeStampStyle variant="caption" component="p">
                <HiClock fontSize="small" />
                <span>{el.time}</span>
              </MenuItemTimeStampStyle>
            </Box>
          </MenuItemSeenStyle>
        ))}

        <Divider />

        {/* Footer */}
        <BoxStyle>
          <LinkStyle href="/" underline="none">
            View All
          </LinkStyle>
        </BoxStyle>
      </StyledMenu>
    </>
  );
};

export default Notifications;
