import { CheckBox } from "@mui/icons-material";
import {
  Button,
  Checkbox,
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
function EditAuthDialog({ setShowEditRoles, showEditRoles }) {
  const [authorities, setAutherities] = useState([]);
  let job_positions = [
    "Software Engineer",
    "Data Scientist",
    "Marketing Manager",
    "Sales Representative",
    "Human Resources Coordinator",
    "Financial Analyst",
    "Graphic Designer",
    "Customer Support Specialist",
    "Project Manager",
    "Product Manager",
  ];
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
      fullWidth
      open={true}
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
      <DialogContent sx={{ paddingX: 1, paddingY: 0 }}>
        {/* {authorities.map((auth) => (
          <Grid container item>
            <Grid item>
              <DialogContentText fontWeight={"bold"} fontSize={18}>
                {auth.name}
              </DialogContentText>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        ))} */}
        <Grid container>
          {job_positions.map((auth) => (
            <Grid container item xs={6} alignItems={"flex-start"} gap={2}>
              <Grid item>
                <Typography variant="h6">{auth}</Typography>
              </Grid>
              <Grid container item xs={4} alignItems={"center"}>
                <Grid item>
                  <RemoveCircleIcon />
                </Grid>
                <Grid item>
                  <AddCircleIcon />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>

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
