import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AxiosHit from "src/utils/api/AxiosHit";
function EditAuthDialog({ setShowEditRoles, showEditRoles, userId }) {
  const [authorities, setAutherities] = useState([]);
  console.log(userId);
  const [newAuthorities, setNewAutherties] = useState(authorities);
  useEffect(() => {
    const getAuthorities = async () => {
      let hitResult = await AxiosHit({
        method: "get",
        url: "/user-auth",
      });
      console.log(hitResult.data.authorities);
      setAutherities(hitResult.data.authorities);
      return hitResult.authorities;
    };
    getAuthorities();
  }, []);
  function changeUserAuths(id) {
    if (newAuthorities.find((e) => e == id)) {
      console.log("found");
      const newFiltered = authorities.filter((e) => e.authId !== id);
      setNewAutherties(newFiltered);
    } else {
      setNewAutherties((prev) => [...prev, id]);
    }
  }
  async function handleSubmitUserAuths() {
    try {
      let hitResult = await AxiosHit({
        method: "put",
        url: "/user-auth",
        data: {
          services: newAuthorities,
          userId: userId,
        },
      });
      console.log(hitResult);
    } catch (error) {
      console.error();
    }
  }
  return (
    <Dialog
      fullWidth
      open={showEditRoles}
      disablePortal
      onClose={() => {
        setShowEditRoles(false);
      }}
      sx={{
        textAlign: "center",
        padding: 4,
        "& .MuiPaper-root": {
          padding: 4,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" fontWeight={"bold"}>
          Edit User Authorities
        </Typography>
      </DialogTitle>
      <DialogContent sx={{}}>
        <Grid container spacing={4}>
          {authorities.map((auth) => (
            <Grid container item alignItems={"center"} xs={6}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6">{auth.name}</Typography>
              </Grid>
              <Grid container item xs={4} alignItems={"center"}>
                <Grid item xs={12}>
                  <AddCircleIcon
                    sx={{ cursor: "pointer", color: "primary.main" }}
                    onClick={() => changeUserAuths(auth.authId)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RemoveCircleIcon sx={{ cursor: "pointer", color: "red" }} />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ paddingTop: 0 }}>
        <Grid container>
          {newAuthorities.map((auth) => {
            <Grid item>
              <Button color="black">
                {authorities.find((e) => e.authId == auth)}
              </Button>
            </Grid>;
          })}
        </Grid>
        <Button onClick={handleSubmitUserAuths} fullWidth variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAuthDialog;
