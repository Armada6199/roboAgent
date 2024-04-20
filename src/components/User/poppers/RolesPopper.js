import DownloadIcon from "@mui/icons-material/Download";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { Button, Grid } from "@mui/material";
import AxiosHit from "src/utils/api/AxiosHit";
export async function handleChangeUserRole(userId, newRole) {
  console.log(userId);
  try {
    const response = await AxiosHit({
      method: "put",
      url: `/user-roles/${userId}/roles/${newRole}`,
    });

    console.log(response);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
function RolesPopper({ userData }) {
  console.log(userData);
  return (
    <Grid container item alignItems={"center"} gap={2} p={2}>
      {userData[4].toLowerCase() == "MEMBER".toLowerCase() ? (
        <Grid item>
          <Button
            fullWidth
            onClick={() =>
              handleChangeUserRole(userData[userData.length - 1], "TEAM_LEAD")
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
            onClick={() => handleChangeUserRole(userData[0], "MEMBER")}
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
