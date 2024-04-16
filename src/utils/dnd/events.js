import AxiosHit from "../api/AxiosHit";

const { arrayMove } = require("@dnd-kit/sortable");

function findValueOfservices(authId, containers) {
  return containers.find((container) =>
    container.services.find((service) => service.authId == authId)
  );
}
export function handleDragStart(event, setActiveId) {
  const { active } = event;
  const { id } = active;
  setActiveId(id);
}
export const handleDragMove = (event, containers, setContainers) => {
  const { active, over } = event;
  // Handle services Sorting
  if (active && over && active.id !== over.id) {
    // Find the active container and over container
    const activeContainer = findValueOfservices(active.id, containers);
    const overContainer = findValueOfservices(over.id, containers);

    // If the active or over container is not found, return
    if (!activeContainer || !overContainer) return;

    // Find the index of the active and over container
    const activeContainerIndex = containers.findIndex(
      (container) => container.id === activeContainer.id
    );
    const overContainerIndex = containers.findIndex(
      (container) => container.id === overContainer.id
    );
    // console.log(activeContainerIndex, "active index");
    // console.log(overContainerIndex, "over index");
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
      console.log("in diffenent");
      let newservices = [...containers];
      const [removedservice] = newservices[
        activeContainerIndex
      ].services.splice(activeserviceIndex, 1);
      newservices[overContainerIndex].services.splice(
        overserviceIndex,
        0,
        removedservice
      );
      console.log("in differnet");
      setContainers(newservices);
    }
  }

  // Handling service Drop Into a Container
  if (active && over && active.id !== over.id) {
    // Find the active and over container
    const activeContainer = findValueOfservices(active.id, containers);
    const overContainer = findValueOfservices(over.id, containers);

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
    const [removedservice] = newservices[activeContainerIndex].services.splice(
      activeserviceIndex,
      1
    );
    newservices[overContainerIndex].services.push(removedservice);
    setContainers(newservices);
  }
};
export async function handleSubmitUserAuths(containers, userId) {
  console.log(userId);
  try {
    let hitResult = await AxiosHit({
      method: "put",
      url: "/user-auth",
      data: {
        services: containers[0].services,
        userId: userId,
      },
    });
    console.log(hitResult);
  } catch (error) {
    console.error();
  }
}
///service drop to another container

export function handleDragEnd(event, containers, setContainers, setActiveId) {
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
    const activeContainer = findValueOfservices(active.id, containers);
    const overContainer = findValueOfservices(over.id, containers);

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
    const activeContainer = findValueOfservices(active.id, containers);
    const overContainer = findValueOfservices(over.id, containers);

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
    const [removedservice] = newservices[activeContainerIndex].services.splice(
      activeserviceIndex,
      1
    );
    newservices[overContainerIndex].services.push(removedservice);
    setContainers(newservices);
  }
  setActiveId(null);
}
