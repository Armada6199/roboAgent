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
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AxiosHit from "src/utils/api/AxiosHit";
import DraggableServiceItem from "./DraggableServiceItem";
import ServiceContainer from "./ServiceContainer";
function handleFilterServices(activeServices, allServices) {
  const filteredArray2 = allServices.filter(
    (service) =>
      !activeServices.some(
        (activeService) => activeService.authId === service.authId
      )
  );
  return filteredArray2;
}
function DraggableTest({ handleCloseServiceDialog, userData }) {
  const [activeId, setActiveId] = useState(null);
  const [currentContainerId, setCurrentContainerId] = useState(null);
  const [containerName, steContainerName] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [authorities, setAutherities] = useState([]);
  const [containers, setContainers] = useState([
    {
      id: 2,
      title: "All Services",
      services: authorities,
    },
    {
      id: 1,
      title: "Active Services",
      services: userData[8],
    },
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  function findValueOfservices(authId) {
    return containers.find((container) =>
      container.services.find((service) => service.authId == authId)
    );
  }
  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }
  const handleDragMove = (event) => {
    const { active, over } = event;

    // Handle services Sorting
    if (active && over && active.id !== over.id) {
      // Find the active container and over container
      const activeContainer = findValueOfservices(active.id);
      const overContainer = findValueOfservices(over.id);

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over service
      const activeserviceIndex = activeContainer.services.findIndex(
        (service) => service.authId === active.id
      );
      const overserviceIndex = overContainer.services.findIndex(
        (service) => service.authId === over.id
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newservices = [...containers];
        newservices[activeContainerIndex].services = arrayMove(
          newservices[activeContainerIndex].services,
          activeserviceIndex,
          overserviceIndex
        );

        setContainers(newservices);
      } else {
        // In different containers
        let newservices = [...containers];
        const [removedservice] = newservices[
          activeContainerIndex
        ].services.splice(activeserviceIndex, 1);
        newservices[overContainerIndex].services.splice(
          overserviceIndex,
          0,
          removedservice
        );
        setContainers(newservices);
      }
    }

    // Handling service Drop Into a Container
    if (active && over && active.id !== over.id) {
      // Find the active and over container
      const activeContainer = findValueOfservices(active.id);
      const overContainer = findValueOfservices(over.id);

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over service
      const activeserviceIndex = activeContainer.services.findIndex(
        (service) => service.authId === active.id
      );

      // Remove the active service from the active container and add it to the over container
      let newservices = [...containers];
      const [removedservice] = newservices[
        activeContainerIndex
      ].services.splice(activeserviceIndex, 1);
      newservices[overContainerIndex].services.push(removedservice);
      setContainers(newservices);
    }
  };
  async function handleSubmitUserAuths() {
    try {
      let hitResult = await AxiosHit({
        method: "put",
        url: "/user-auth",
        data: {
          services: containers[1].services,
          userId: userData[0],
        },
      });
      console.log(hitResult);
    } catch (error) {
      console.error();
    }
  }
  ///service drop to another container

  function handleDragEnd(event) {
    const { active, over } = event;

    // Handling Container Sorting
    if (active && over && active.id !== over.id) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newservices = [...containers];
      newservices = arrayMove(
        newservices,
        activeContainerIndex,
        overContainerIndex
      );
      setContainers(newservices);
    }

    // Handling service Sorting
    if (active && over && active.id !== over.id) {
      // Find the active and over container
      const activeContainer = findValueOfservices(active.id);
      const overContainer = findValueOfservices(over.id);

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over service
      const activeserviceIndex = activeContainer.services.findIndex(
        (service) => service.authId === active.id
      );
      const overserviceIndex = overContainer.services.findIndex(
        (service) => service.authId === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newservices = [...containers];
        newservices[activeContainerIndex].services = arrayMove(
          newservices[activeContainerIndex].services,
          activeserviceIndex,
          overserviceIndex
        );
        setContainers(newservices);
      } else {
        // In different containers
        let newservices = [...containers];
        const [removedservice] = newservices[
          activeContainerIndex
        ].services.splice(activeserviceIndex, 1);
        newservices[overContainerIndex].services.splice(
          overserviceIndex,
          0,
          removedservice
        );
        setContainers(newservices);
      }
    }
    // Handling service dropping into Container
    if (active && over && active.id !== over.id) {
      // Find the active and over container
      const activeContainer = findValueOfservices(active.id);
      const overContainer = findValueOfservices(over.id);

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over service
      const activeserviceIndex = activeContainer.services.findIndex(
        (service) => service.authId === active.id
      );

      let newservices = [...containers];
      const [removedservice] = newservices[
        activeContainerIndex
      ].services.splice(activeserviceIndex, 1);
      newservices[overContainerIndex].services.push(removedservice);
      setContainers(newservices);
    }
    setActiveId(null);
  }

  useEffect(() => {
    const getAuthorities = async () => {
      let hitResult = await AxiosHit({
        method: "get",
        url: "/user-auth",
      });
      const newServices = handleFilterServices(
        userData[8],
        hitResult.data.services
      );
      const newContainer = containers;
      newContainer[0].services = newServices;
      setContainers(newContainer);
      setAutherities(hitResult.data.services);
      return hitResult.services;
    };
    getAuthorities();
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
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
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
      <Grid container item justifyContent={"flex-end"}>
        <Grid item xs={12} md={4}>
          <Button fullWidth onClick={handleSubmitUserAuths} variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DraggableTest;
