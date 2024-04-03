import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormStyle from "src/styles/styles";
import AxiosHit from "src/utils/api/AxiosHit";
function EditAuthDialog({ setShowEditRoles, showEditRoles }) {
  const [authorities, setAutherities] = useState([]);
  useEffect(() => {
    const getAuthorities = async () => {
      let hitResult = await AxiosHit({
        method: "get",
        url: "/user-auth",
      });
      console.log(hitResult.data.user.authorities);
      setAutherities(hitResult.data.user.authorities);
      return hitResult.user.authorities;
    };
    getAuthorities();
  }, []);
  return (
    <Dialog
      fullWidth={true}
      open={showEditRoles}
      onClose={() => {
        setShowEditRoles(false);
      }}
      sx={{
        textAlign: "center",
        "& .MuiPaper-root": {
          padding: 1.5,
        },
      }}
    >
      <DialogTitle>
        <Typography fontSize={20} fontWeight={"bold"}>
          Edit User Authorities
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ paddingX: 1, paddingY: 0 }}>
        {authorities.map((auth) => (
          <Grid container item>
            <Grid item>
              <DialogContentText fontWeight={"bold"} fontSize={18}>
                {auth.name}
              </DialogContentText>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        ))}
        {console.log(authorities)}
        <DialogContentText fontWeight={"bold"}></DialogContentText>
      </DialogContent>
      <DialogActions sx={{ paddingTop: 0 }}>
        <FormStyle sx={{ width: "100%" }}>
          <Button fullWidth variant="contained">
            Submit
          </Button>
        </FormStyle>
      </DialogActions>
    </Dialog>
  );
}

export default EditAuthDialog;
