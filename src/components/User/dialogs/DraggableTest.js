import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  handleDragEnd,
  handleDragMove,
  handleDragStart,
  handleSubmitUserAuths,
} from "src/utils/dnd/events";
import {
  handleFetchAuthorities,
  handleSetContainerService,
} from "src/utils/users/api/users";
import DraggableServiceItem from "./DraggableServiceItem";
import ServiceContainer from "./ServiceContainer";
import { Box } from "@mui/system";
import { glassMorphisimStyle } from "src/styles/styles";

function DraggableTest({ handleCloseServiceDialog, activeServices, userId }) {
  const [activeId, setActiveId] = useState(null);
  const [currentContainerId, setCurrentContainerId] = useState(null);
  const [containerName, steContainerName] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [authorities, setAuthorities] = useState([]);
  const [containers, setContainers] = useState([
    {
      id: 1,
      title: "All Services",
      services: [],
    },
    {
      id: 0,
      title: "Active Services",
      services: activeServices,
    },
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const get = async () => {
      const auth = await handleFetchAuthorities(setAuthorities);
      console.log(auth);
      handleSetContainerService(
        activeServices,
        auth,
        containers,
        setContainers
      );
    };
    get();
  }, []);

  return (
    <Grid
      container
      item
      onClose={() => handleCloseServiceDialog()}
      gap={4}
      alignItems={"flex-start"}
    >
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
                items={container.services.map((services) => services.authId)}
              >
                <Grid container item gap={4}>
                  {container.services.map((service) => (
                    <DraggableServiceItem
                      key={service.authId}
                      service={service}
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
