import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { glassMorphisimStyle } from "src/styles/styles";
import DraggableServiceItem from "./DraggableServiceItem";

function ServiceContainer({ id, title, container, index, authorities }) {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: id,
    data: {
      type: "container",
      container,
    },
  });

  return (
    <Grid
      container
      item
      xs={12}
      md={6}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
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
        <SortableContext
          items={authorities?.map((authority) => authority.authId)}
        >
          <Grid container item gap={8}>
            {authorities?.map((authority) => (
              <DraggableServiceItem
                key={authority.authId}
                authority={authority}
                index={container.id}
              />
            ))}
          </Grid>
        </SortableContext>
      </Grid>
    </Grid>
  );
}

export default ServiceContainer;
