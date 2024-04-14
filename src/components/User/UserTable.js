import { Button, Grid, Modal } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import AxiosHit from "src/utils/api/AxiosHit";
import UserServices from "./dialogs/UserServices";
import DraggableTest from "./dialogs/DraggableTest";
import { glassMorphisimStyle } from "src/styles/styles";
function reshapeUserData(usersArr = []) {
  const newUsersArr = [];
  for (let user of usersArr) {
    let newUserArr = [];
    for (let key of Object.keys(user)) {
      // if (key == "services" || key == "users") break;
      newUserArr.push(user[key]);
    }
    newUsersArr.push(newUserArr);
  }
  return newUsersArr;
}

function UserTable() {
  const [isOpenServiceDialog, setIsOpenServiceDialog] = useState(false);
  const [tableData, setTableData] = useState({});
  const [userData, setUserData] = useState({});
  const handleOpenServiceDialog = (userData) => {
    setUserData(userData);
    setIsOpenServiceDialog(true);
  };
  const handleCloseServiceDialog = () => {
    setIsOpenServiceDialog(false);
  };
  /// MOVE TO AN EXTERNAL API FOLDER ONCE FINISHED WORKING
  async function handleFetchUserData(setTableData) {
    try {
      const response = await AxiosHit({
        url: "users/getallusers?size=10",
        method: "get",
      });
      const newUsersDataReshaped = reshapeUserData(response?.data?.users);
      console.log(newUsersDataReshaped);
      setTableData({
        usersData: newUsersDataReshaped,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  const columns = [
    {
      name: "userID",
      label: "User ID",

      options: {
        filter: true,
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
      name: "Users",
      label: "Users",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Grid container item alignItems={"center"}>
              <Button fullWidth>View All</Button>
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
                onClick={() => handleOpenServiceDialog(tableMeta.rowData)}
              >
                View All
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
    <Grid container item gap={4} alignItems={"flex-start"}>
      <Grid container item>
        <MUIDataTable
          title={"Users"}
          data={tableData.usersData}
          columns={columns}
          options={options}
        />
      </Grid>
      {/* {isOpenServiceDialog && (
        <UserServices
          userData={userData}
          handleCloseServiceDialog={handleCloseServiceDialog}
          isOpenServiceDialog={isOpenServiceDialog}
        />
      )} */}
      <Modal
        open={isOpenServiceDialog}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClose={handleCloseServiceDialog}
      >
        <Grid
          container
          item
          xs={12}
          md={6}
          p={4}
          sx={{ ...glassMorphisimStyle }}
        >
          <DraggableTest
            userData={userData}
            handleCloseServiceDialog={handleCloseServiceDialog}
            isOpenServiceDialog={isOpenServiceDialog}
          />
        </Grid>
      </Modal>
    </Grid>
  );
}

export default UserTable;
