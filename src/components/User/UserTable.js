import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Grid, Modal, Popper, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { glassMorphisimStyle } from "src/styles/styles";
import {
  handleFetchAuthorities,
  handleFetchAllUsers,
  handleSetContainerService,
} from "src/utils/users/api/users";
import DNDServicesModal from "./dialogs/DNDServicesModal";
import ServiceDialog from "./dialogs/ServiceDialog";
import "./usersTable.css";
import RolesPopper from "./poppers/RolesPopper";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";

function UserTable() {
  const [isOpenServicesModal, setIsOpenServicesModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [userData, setUserData] = useState({ userId: null });
  const [isEditServiceDialogOpen, setIsEditServiceDialogOpen] = useState(false);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const setAlertInfo = useUpdateAlert();
  const handleStatusClick = (event, rowData) => {
    console.log(rowData);
    setUserData(rowData);
    setStatusAnchorEl(statusAnchorEl ? null : event.currentTarget);
  };
  const handleCloseRolePopper = () => setStatusAnchorEl(null);
  const statusOpen = Boolean(statusAnchorEl);
  const statusPopperId = statusOpen ? "simple-popper" : undefined;
  const handleOpenServiceDialog = (tableData) => {
    setUserData(tableData);
    setIsEditServiceDialogOpen(true);
  };
  const handleOpenServiceModal = (userData) => {
    console.log(userData);
    handleSetContainerService(
      userData[8],
      authorities,
      containers,
      setContainers
    );
    setUserData(userData);
    setIsOpenServicesModal(true);
  };
  const handleCloseServicesModal = () => {
    setIsOpenServicesModal(false);
  };
  const handleCloseServiceDialog = () => {
    setIsEditServiceDialogOpen(false);
  };
  const [containers, setContainers] = useState([
    {
      id: 1,
      title: "All Services",
      authorities: [],
    },
    {
      id: 0,
      title: "Active Services",
      authorities: [],
    },
  ]);
  const columns = [
    {
      name: "FirstName",
      label: "First Name",

      options: {
        filter: true,
        display: "none",
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Grid display={"none"}></Grid>;
        },
      },
    },
    {
      name: "FirstName",
      label: "First Name",

      options: {
        filter: true,
      },
    },
    {
      name: "middleName",
      label: "Midle Name",

      options: {
        filter: true,
      },
    },
    {
      name: "last Name",
      label: "Last Name",

      options: {
        filter: true,
      },
    },
    {
      name: "status",
      label: "Status",

      options: {
        filter: true,
      },
    },
    {
      name: "role",
      label: "Role",

      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Grid container item alignItems={"center"} gap={2}>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight={500}>
                  {value}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ cursor: "pointer" }}
                onClick={(event) => handleStatusClick(event, tableMeta.rowData)}
              >
                <MoreVertIcon sx={{ color: "primary.main" }} />
              </Grid>
            </Grid>
          );
        },
      },
    },
    {
      name: "email",
      label: "Email",

      options: {
        filter: true,
      },
    },
    {
      name: "service",
      label: "Service",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const formattedValue = value.split("_").join(" ");
          return (
            <Grid container item alignItems={"center"} gap={2}>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight={500}>
                  {formattedValue}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ cursor: "pointer" }}
                onClick={() => handleOpenServiceDialog(tableMeta.rowData)}
              >
                <MoreVertIcon sx={{ color: "primary.main" }} />
              </Grid>
            </Grid>
          );
        },
      },
    },
    {
      name: "services",
      label: "Services",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          // console.log(tableMeta);
          return (
            <Grid container item alignItems={"center"}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleOpenServiceModal(tableMeta.rowData)}
              >
                View all
              </Button>
            </Grid>
          );
        },
      },
    },
    {
      name: "team",
      label: "Team",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Grid container item alignItems={"center"}>
              <Grid item>
                <Typography>{value}</Typography>
              </Grid>
              {/* <Grid item>
                <Typography>{value}</Typography>
              </Grid> */}
            </Grid>
          );
        },
      },
    },
  ];
  useEffect(() => {
    handleFetchAllUsers({ setTableData, requestAction: "GET_ALL_USERS" });
    handleFetchAuthorities({
      setAuthorities,
      requestAction: "GET_ALL_AUTHORITIES",
    });
  }, []);
  const options = {
    filterType: "checkbox",
    selectableRowsHeader: false,
  };
  return (
    <Grid container item gap={4}>
      <Grid container item>
        <MUIDataTable
          title={"Users"}
          data={tableData}
          columns={columns}
          options={options}
        />
      </Grid>

      <Modal
        open={isOpenServicesModal}
        onClose={handleCloseServicesModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90vh",
        }}
      >
        <Grid
          container
          item
          xs={12}
          md={6}
          sx={{
            ...glassMorphisimStyle,
            minHeight: "90vh",
          }}
        >
          {console.log(containers)}
          <DNDServicesModal
            containers={containers}
            userData={userData}
            setContainers={setContainers}
          />
        </Grid>
      </Modal>

      {isEditServiceDialogOpen && (
        <ServiceDialog
          authorities={authorities}
          userId={userData[0]}
          isEditServiceDialogOpen={isEditServiceDialogOpen}
          handleCloseServiceDialog={handleCloseServiceDialog}
          tableData={tableData}
          setTableData={setTableData}
          setAlertInfo={setAlertInfo}
        />
      )}

      <Popper
        id={statusPopperId}
        open={statusOpen}
        anchorEl={statusAnchorEl}
        sx={glassMorphisimStyle}
      >
        {userData && (
          <RolesPopper
            tableData={tableData}
            setTableData={setTableData}
            userData={userData}
            handleCloseRolePopper={handleCloseRolePopper}
          />
        )}
      </Popper>
    </Grid>
  );
}

export default UserTable;
