import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useState } from "react";
import AxiosHit from "src/utils/api/AxiosHit";

function ServiceDialog({
  isEditServiceDialogOpen,
  handleCloseServiceDialog,
  authorities,
  activeOpenedUserId,
}) {
  const [userNewService, setUserNewService] = useState();
  const handleChangeUserNewService = (serviceId) => {
    setUserNewService(serviceId.target.value);
  };
  //move to an external folder
  console.log(activeOpenedUserId);
  function handleSubmitUserNewService() {
    try {
      const response = AxiosHit({
        method: "put",
        url: `service/${activeOpenedUserId}/service/${userNewService}`,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  return (
    <Dialog
      disableEscapeKeyDown
      open={isEditServiceDialogOpen}
      onClose={handleCloseServiceDialog}
      fullWidth={"md"}
    >
      <DialogTitle>Choose User Main Service</DialogTitle>
      <DialogContent>
        <FormControl sx={{ my: 1, width: "100%" }}>
          <InputLabel id="main_service">Service</InputLabel>
          <Select
            id="main_service"
            fullWidth
            onChange={handleChangeUserNewService}
            input={<OutlinedInput label="Service" />}
          >
            {authorities.map((auth) => (
              <MenuItem key={auth.authId} value={auth.authId}>
                {auth.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseServiceDialog}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmitUserNewService}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ServiceDialog;
