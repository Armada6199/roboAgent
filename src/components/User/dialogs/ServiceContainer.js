import { Grid, Typography } from "@mui/material";
import React from "react";
import { glassMorphisimStyle } from "src/styles/styles";

function ServiceContainer({ id, children, title, onAddService, index }) {
  return (
    <Grid
      container
      item
      xs={6}
      minHeight={"200px"}
      height={"100%"}
      alignItems={"flex-start"}
      sx={{ ...glassMorphisimStyle, zIndex: 0 }}
    >
      <Grid
        container
        item
        justifyContent={"center"}
        alignItems={"flex-start"}
        py={2}
        borderBottom={"3px solid"}
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
      <Grid
        container
        item
        p={4}
        minHeight={"200px"}
        borderRadius={"10px"}
        sx={{ borderTopRightRadius: "0", borderTopLeftRadius: 0 }}
        bgcolor={"#f6f6f6"}
      >
        {children}
      </Grid>
    </Grid>
  );
}

export default ServiceContainer;
