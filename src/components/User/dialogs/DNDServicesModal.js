import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import DraggableTest from "./DraggableTest";
import { handleSubmitUserAuths } from "src/utils/users/api/users";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";

function DNDServicesModal({
  userData,
  containers,
  setAuthorities,
  handleCloseServicesModal,
  authorities,
}) {
  const setAlertInfo = useUpdateAlert();
  return (
    <>
      <Grid
        container
        item
        p={4}
        sx={{
          overflowX: "hidden",
          overflowY: "scroll",
          maxHeight: "calc(90vh - 65px)",
        }}
      >
        <DraggableTest
          setAuthorities={setAuthorities}
          containers={containers}
          authorities={authorities}
        />
      </Grid>
      <Box
        position={"fixed"}
        bgcolor={"#f6f6f6"}
        height={65}
        width={"100%"}
        bottom={0}
        display={"flex"}
        px={4}
        alignItems={"center"}
        sx={{
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "10px",
        }}
      >
        <Grid container item justifyContent={"space-between"} gap={4}>
          <Grid item xs={12} md={4}>
            <Button
              onClick={handleCloseServicesModal}
              fullWidth
              variant="contained"
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              onClick={() =>
                handleSubmitUserAuths({
                  roboAuthorities: authorities.filter(
                    (auth) => auth.containerValue == "active_services"
                  ),
                  requestAction: "UPDATE_USER_AUTHORITIES",
                  setAlertInfo,
                  userId: userData[0],
                  handleClose: handleCloseServicesModal,
                })
              }
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DNDServicesModal;
