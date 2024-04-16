import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  handleFetchAuthorities,
  handleSubmitUserAuths,
} from "src/utils/users/api/users";
import servicesIcons from "../../../constants/servicesIcons";
function UserServices({
  handleCloseServiceDialog,
  isOpenServiceDialog,
  userData,
}) {
  const [authorities, setAuthorities] = useState([]);
  const [newAuthorities, setNewAutherties] = useState(userData[8]);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  useEffect(() => {
    handleFetchAuthorities(setAuthorities);
  }, []);
  function changeUserAuths(auth) {
    const foundService = newAuthorities.find((e) => e.authId == auth.authId);
    if (foundService) {
      const newServices = newAuthorities.filter(
        (e) => e.authId !== auth.authId
      );
      setNewAutherties(newServices);
    } else {
      const newServices = newAuthorities.slice();
      newServices.push(auth);
      console.log(newServices);
      setNewAutherties(newServices);
    }
  }
  const handleCancel = () => {
    setNewAutherties([]);

    setIsEditModeOn(false);
  };

  return (
    <Dialog
      fullWidth
      open={isOpenServiceDialog}
      disablePortal
      onClose={() => handleCloseServiceDialog()}
      sx={{
        textAlign: "center",
        padding: 4,
        "& .MuiPaper-root": {
          padding: 4,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" fontWeight={"bold"}>
          {isEditModeOn ? "Edit" : "View"} User Services
        </Typography>
      </DialogTitle>
      <DialogContent sx={{}}>
        <Grid container sx={{ paddingTop: 4 }} gap={8}>
          <Grid container item>
            {(isEditModeOn ? authorities : userData[8]).map((auth) => (
              <Grid
                container
                item
                justifyContent={"center"}
                alignItems={"center"}
                xs={6}
                marginBottom={8}
                gap={1}
              >
                <Grid item xs={12}>
                  {servicesIcons[auth.authId]}
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight={"500"} variant="body1">
                    {auth.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {isEditModeOn && (
                    <AddCircleIcon
                      sx={{ cursor: "pointer", color: "primary.main" }}
                      onClick={() => changeUserAuths(auth)}
                    />
                  )}
                </Grid>
                {isEditModeOn && <Grid item></Grid>}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container item gap={4}>
          {isEditModeOn && (
            <Grid container item spacing={4} paddingTop={4}>
              {newAuthorities.map((auth) => (
                <Grid item>
                  <Button
                    variant="contained"
                    fullWidth
                    color="red"
                    sx={{ color: "white" }}
                    onClick={() => changeUserAuths(auth)}
                    endIcon={<ClearIcon color="white" />}
                  >
                    {authorities.find((e) => e.authId == auth.authId)?.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          )}
          <Grid container item spacing={4} justifyContent={"flex-end"}>
            {isEditModeOn && (
              <Grid item xs={6}>
                <Button onClick={handleCancel} fullWidth variant="contained">
                  Cancel
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                onClick={() =>
                  handleSubmitUserAuths(userData[0], newAuthorities)
                }
                fullWidth
                variant="contained"
              >
                {isEditModeOn ? "Confirm" : "Edit"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default UserServices;
