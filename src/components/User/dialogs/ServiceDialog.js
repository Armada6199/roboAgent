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
import { useEffect, useState } from "react";
import {
  handleFetchServiceList,
  handleSubmitUserNewService,
} from "src/utils/users/api/users";

function ServiceDialog({
  isEditServiceDialogOpen,
  handleCloseServiceDialog,
  userId,
  tableData,
  setAlertInfo,
  setTableData,
}) {
  const [userNewService, setUserNewService] = useState();
  const [serviceList, setServiceList] = useState([]);
  const handleChangeUserNewService = (serviceId) => {
    setUserNewService(serviceId.target.value);
  };
  useEffect(() => {
    handleFetchServiceList({
      setServiceList,
      requestAction: "SET_SERVICE_LIST",
    });
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
            {serviceList?.map?.((service) => (
              <MenuItem key={service.id} value={service.service}>
                {service.service}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseServiceDialog}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() =>
            handleSubmitUserNewService({
              handleCloseServiceDialog,
              userId,
              userNewService,
              requestAction: "SET_SUBMIT_USER_SERVICE",
              tableData,
              setTableData,
              setAlertInfo,
            })
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ServiceDialog;
