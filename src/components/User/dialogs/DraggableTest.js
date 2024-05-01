import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { onDragEnd, onDragOver, onDragStart } from "src/utils/dnd/events"; // Import drag event handlers
import ServiceContainer from "./ServiceContainer";

function DraggableTest({ containers, setAuthorities, authorities }) {
  const [activeContainer, setActiveContainer] = useState(null);
  const [activeAuthority, setActiveAuthority] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  return (
    <Grid container item gap={4} alignItems={"flex-start"}>
      <Grid item>
        <Typography variant="h4" fontWeight={"bold"}>
          Edit User Services
        </Typography>
      </Grid>

      <Grid container item flexWrap={"nowrap"} gap={4}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={(e) => onDragStart(e, setActiveAuthority)}
          onDragOver={(e) => onDragOver(e, setAuthorities, authorities)}
          onDragEnd={(e) =>
            onDragEnd(e, setActiveContainer, setActiveAuthority)
          }
        >
          {containers.map((container) => (
            <ServiceContainer
              id={container.id}
              title={container.title}
              key={container.id}
              index={container.id}
              container={container}
              authorities={authorities.filter(
                (auth) => auth.containerValue === container.value
              )}
            />
          ))}
        </DndContext>
      </Grid>
    </Grid>
  );
}

export default DraggableTest;
