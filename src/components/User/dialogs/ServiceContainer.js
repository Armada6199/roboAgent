import { Grid, Typography } from "@mui/material";
import React from "react";
import { glassMorphisimStyle } from "src/styles/styles";

function ServiceContainer({ id, children, title, onAddService, index }) {
  console.log(index);
  return (
    <Grid
      container
      item
      xs={6}
      key={id}
      height={"100%"}
      alignItems={"flex-start"}
      sx={{ ...glassMorphisimStyle }}
    >
      <Grid
        container
        item
        justifyContent={"center"}
        alignItems={"center"}
        py={2}
        borderBottom={"2px solid"}
        sx={{ borderBottomColor: index == 1 ? "blue.main" : "primary.main" }}
      >
        <Typography
          fontWeight={600}
          variant="h5"
          color={index == 1 ? "blue.main" : "primary.main"}
        >
          {title}
        </Typography>
      </Grid>
      <Grid container item p={4} bgcolor={"#f6f6f6"}>
        {children}
      </Grid>
    </Grid>
  );
}

export default ServiceContainer;
