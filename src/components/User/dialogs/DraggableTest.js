import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import {
  debouncedHandleDragEnd,
  handleDragEnd,
  handleDragMove,
  handleDragMoveDebounced,
  handleDragStart,
} from "src/utils/dnd/events";
import DraggableServiceItem from "./DraggableServiceItem";
import ServiceContainer from "./ServiceContainer";

function DraggableTest({ containers, setContainers }) {
  const [activeId, setActiveId] = useState(null);
  const [currentContainerId, setCurrentContainerId] = useState(null);
  const [containerName, steContainerName] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
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
          onDragStart={(e) => handleDragStart(e, setActiveId)}
          onDragMove={(e) =>
            handleDragMove(e, containers, setContainers, setActiveId)
          }
          onDragEnd={(e) =>
            handleDragEnd(e, containers, setContainers, setActiveId)
          }
        >
          {containers.map((container) => (
            <ServiceContainer
              id={container.id}
              title={container.title}
              key={container.id}
              index={container.id}
              onAddService={() => {}}
            >
              <SortableContext
                items={container.authorities.map((authority) => authority.name)}
              >
                <Grid container item gap={8}>
                  {container.authorities.map((authority) => (
                    <DraggableServiceItem
                      key={String(authority.authId)}
                      authority={authority}
                      index={container.id}
                    />
                  ))}
                </Grid>
              </SortableContext>
            </ServiceContainer>
          ))}
        </DndContext>
      </Grid>
    </Grid>
  );
}

export default DraggableTest;
