import { Button, Grid, Modal, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { glassMorphisimStyle } from "src/styles/styles";
import { handleFetchUserData } from "src/utils/users/api/users";
import DraggableTest from "./dialogs/DraggableTest";
import "./usersTable.css";
import { handleSubmitUserAuths } from "src/utils/dnd/events";
import { Box } from "@mui/system";

function UserTable() {
  const [isOpenServiceDialog, setIsOpenServiceDialog] = useState(false);
  const [tableData, setTableData] = useState({});
  const [userData, setUserData] = useState({ userId: null });
  const handleOpenServiceDialog = (userData) => {
    setUserData({ userId: tableData.userId, userData });
    setIsOpenServiceDialog(true);
  };
  const handleCloseServiceDialog = () => {
    setIsOpenServiceDialog(false);
  };

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
                onClick={() => handleOpenServiceDialog(tableMeta.rowData)}
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
        }}
      >
        <Grid
          container
          item
          xs={12}
          md={6}
          sx={{
            ...glassMorphisimStyle,
            maxHeight: "90vh",
            overflow: "scroll",
          }}
        >
          <Grid container item p={4}>
            {console.log(userData)}
            {userData.userData && (
              <DraggableTest
                activeServices={userData.userData[6]}
                userId={userData.userId}
                handleCloseServiceDialog={handleCloseServiceDialog}
                isOpenServiceDialog={isOpenServiceDialog}
              />
            )}
          </Grid>
          <Box
            position={"sticky"}
            bgcolor={"#f6f6f6"}
            height={65}
            width={"100%"}
            bottom={0}
            display={"flex"}
            px={4}
            alignItems={"center"}
          >
            <Grid container item justifyContent={"space-between"} gap={4}>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  onClick={() => handleSubmitUserAuths()}
                  variant="contained"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  onClick={() => handleSubmitUserAuths(containers, userId)}
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
