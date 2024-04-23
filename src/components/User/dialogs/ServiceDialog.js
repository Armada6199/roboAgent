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
import axios from "axios";
import { useEffect, useState } from "react";
import AxiosHit from "src/utils/api/AxiosHit";
export async function handleFetchServiceList(setServiceList) {
  try {
    const hitResult = await axios.get(`/service`);
    console.log(hitResult);
    setServiceList(hitResult.data);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
function ServiceDialog({
  isEditServiceDialogOpen,
  handleCloseServiceDialog,
  authorities,
  activeOpenedUserId,
}) {
  const [userNewService, setUserNewService] = useState();
  const [serviceList, setServiceList] = useState([]);
  const handleChangeUserNewService = (serviceId) => {
    setUserNewService(serviceId.target.value);
  };
  //move to an external folder
  // console.log(activeOpenedUserId);
  async function handleSubmitUserNewService() {
    try {
      const response = await AxiosHit({
        method: "put",
        url: `service/${activeOpenedUserId}/service/${userNewService}`,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  useEffect(() => {
    handleFetchServiceList(setServiceList);
  }, []);
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
            {serviceList.map((service) => (
              <MenuItem key={service.id} value={service.service}>
                {service.service}
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
