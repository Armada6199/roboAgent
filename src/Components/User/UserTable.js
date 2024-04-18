import { Button, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { glassMorphisimStyle } from "src/styles/styles";
import { handleSubmitUserAuths } from "src/utils/dnd/events";
import {
  handleFetchAuthorities,
  handleFetchUserData,
  handleSetContainerService,
} from "src/utils/users/api/users";
import DraggableTest from "./dialogs/DraggableTest";
import "./usersTable.css";

function UserTable() {
  const [isOpenServiceDialog, setIsOpenServiceDialog] = useState(false);
  const [tableData, setTableData] = useState({});
  const [authorities, setAuthorities] = useState([]);
  const [userData, setUserData] = useState({ userId: null });
  const handleOpenServiceDialog = (activeAuthorites, userId) => {
    console.log(activeAuthorites);
    handleSetContainerService(
      activeAuthorites,
      authorities,
      containers,
      setContainers
    );
    setUserData({ userId: userId, userData });
    setIsOpenServiceDialog(true);
  };
  const handleCloseServiceDialog = () => {
    setIsOpenServiceDialog(false);
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
          return (
            <Grid container item alignItems={"center"}>
              <Typography variant="body1">Visas</Typography>
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
          return (
            <Grid container item alignItems={"center"}>
              <Button
                fullWidth
                variant="contained"
                onClick={() =>
                  handleOpenServiceDialog(
                    tableMeta.rowData[6],
                    tableMeta.rowData[tableMeta.rowData.length - 1]
                  )
                }
              >
                View all
              </Button>
            </Grid>
          );
        },
      },
    },
  ];
  useEffect(() => {
    handleFetchUserData(setTableData);
    const get = async () => {
      const auth = await handleFetchAuthorities(setAuthorities);
      setAuthorities(auth);
    };
    get();
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
          data={tableData.usersData}
          columns={columns}
          options={options}
        />
      </Grid>

      <Modal
        open={isOpenServiceDialog}
        onClose={handleCloseServiceDialog}
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
            {userData.userData && (
              <DraggableTest
                handleCloseServiceDialog={handleCloseServiceDialog}
                isOpenServiceDialog={isOpenServiceDialog}
                containers={containers}
                setContainers={setContainers}
              />
            )}
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
                <Button fullWidth variant="contained">
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  onClick={() =>
                    handleSubmitUserAuths(containers, userData.userId)
                  }
                  variant="contained"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Modal>
    </Grid>
  );
}

export default UserTable;
