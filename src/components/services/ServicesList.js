import { Grid, Typography } from "@mui/material";
import React from "react";

function ServicesList({ authorities, handleAddUserAuth }) {
  return (
    <Grid container item justifyContent={"flex-start"} gap={4}>
      {authorities.map((auth) => {
        return (
          <Grid
            item
            xs={12}
            md={3}
            key={auth.authId}
            p={2}
            sx={{
              boxShadow: "-3px 7px 9px 1px rgba(0,0,0,0.15)",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={() => handleAddUserAuth(auth.authId)}
          >
            <Typography
              variant="body1"
              textAlign={"center"}
              fontWeight={700}
              color={"primary.main"}
            >
              {auth.name.split("_").join(" ")}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ServicesList;
