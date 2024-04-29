import DownloadIcon from "@mui/icons-material/Download";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { Button, Grid } from "@mui/material";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import { hanldeSubmitUserNewRole } from "src/utils/users/api/users";

function RolesPopper({
  userData,
  setTableData,
  tableData,
  handleCloseRolePopper,
}) {
  const setAlertInfo = useUpdateAlert();

  return (
    <Grid container item alignItems={"center"} gap={2} p={2}>
      {userData[5]?.toLowerCase() == "MEMBER".toLowerCase() ? (
        <Grid item>
          <Button
            fullWidth
            onClick={() =>
              hanldeSubmitUserNewRole({
                userId: userData[0],
                newRole: "TEAM_LEAD",
                setTableData,
                requestAction: "UPDATE_USER_ROLE",
                tableData,
                userData,
                handleCloseRolePopper,
                setAlertInfo,
              })
            }
            startIcon={<UpgradeIcon />}
            variant="outlined"
          >
            Promote to team Lead
          </Button>
        </Grid>
      ) : (
        <Grid item>
          <Button
            fullWidth
            onClick={() =>
              hanldeSubmitUserNewRole({
                userId: userData[0],
                newRole: "MEMBER",
                setTableData,
                requestAction: "UPDATE_USER_ROLE",
                tableData,
                userData,
                handleCloseRolePopper,
                setAlertInfo,
              })
            }
            startIcon={<DownloadIcon />}
            variant="outlined"
          >
            Emote to Member
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default RolesPopper;
