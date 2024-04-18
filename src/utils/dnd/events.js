import AxiosHit from "../api/AxiosHit";

const { arrayMove } = require("@dnd-kit/sortable");

function findValueOfservices(authId, containers) {
  for (const container of containers) {
    const authority = container.authorities.find(
      (authority) => authority.authId === authId
    );
    if (authority) {
      return container;
    }
  }
  return null; // Or any other value indicating that no container was found
}
export function handleDragStart(event, setActiveId) {
  const { active } = event;
  const { id } = active;
  setActiveId(id);
}
// export const handleDragMove = (event, containers, setContainers) => {
//   const { active, over } = event;
//   // Handle services Sorting
//   if (active && over && active.id !== over.id) {
//     // Find the active container and over container
//     const activeContainer = findValueOfservices(active.id, containers);
//     const overContainer = findValueOfservices(over.id, containers);

//     // If the active or over container is not found, return
//     if (!activeContainer || !overContainer) return;

//     // Find the index of the active and over container
//     const activeContainerIndex = containers.findIndex(
//       (container) => container.id === activeContainer.id
//     );
//     const overContainerIndex = containers.findIndex(
//       (container) => container.id === overContainer.id
//     );
//     // console.log(activeContainerIndex, "active index");
//     // console.log(overContainerIndex, "over index");
//     // Find the index of the active and over service
//     const activeserviceIndex = activeContainer.authorities.findIndex(
//       (authority) => authority.authId === active.id
//     );
//     const overserviceIndex = overContainer.authorities.findIndex(
//       (authority) => authority.authId === over.id
//     );
//     // In the same container
//     if (activeContainerIndex === overContainerIndex) {
//       let newservices = [...containers];
//       newservices[activeContainerIndex].authorities = arrayMove(
//         newservices[activeContainerIndex].authorities,
//         activeserviceIndex,
//         overserviceIndex
//       );
//       setContainers(newservices);
//     } else {
//       // In different containers
//       let newservices = [...containers];
//       const [removedservice] = newservices[
//         activeContainerIndex
//       ].authorities.splice(activeserviceIndex, 1);
//       newservices[overContainerIndex].authorities.splice(
//         overserviceIndex,
//         0,
//         removedservice
//       );
//       console.log("in differnet");
//       setContainers(newservices);
//     }
//   }

//   // Handling service Drop Into a Container
//   if (active && over && active.id !== over.id) {
//     // Find the active and over container
//     const activeContainer = findValueOfservices(active.id, containers);
//     const overContainer = findValueOfservices(over.id, containers);

//     // If the active or over container is not found, return
//     if (!activeContainer || !overContainer) return;

//     // Find the index of the active and over container
//     const activeContainerIndex = containers.findIndex(
//       (container) => container.id === activeContainer.id
//     );
//     const overContainerIndex = containers.findIndex(
//       (container) => container.id === overContainer.id
//     );

//     // Find the index of the active and over service
//     const activeserviceIndex = activeContainer.authorities.findIndex(
//       (authority) => authority.authId === active.id
//     );

//     // Remove the active service from the active container and add it to the over container
//     let newservices = [...containers];
//     const [removedservice] = newservices[
//       activeContainerIndex
//     ].authorities.splice(activeserviceIndex, 1);
//     newservices[overContainerIndex].authorities.push(removedservice);
//     setContainers(newservices);
//   }
// };

///service drop to another container
export const handleDragMove = (event, containers, setContainers) => {
  const { active, over } = event;

  if (!active || !over || active.id === over.id) return;

  const activeContainer = findValueOfservices(active.id, containers);
  const overContainer = findValueOfservices(over.id, containers);

  if (!activeContainer || !overContainer) return;

  const activeContainerIndex = containers.findIndex(
    (container) => container.id === activeContainer.id
  );
  const overContainerIndex = containers.findIndex(
    (container) => container.id === overContainer.id
  );

  const activeServiceIndex = activeContainer.authorities.findIndex(
    (authority) => authority.authId === active.id
  );
  const overServiceIndex = overContainer.authorities.findIndex(
    (authority) => authority.authId === over.id
  );

  let newContainers = [...containers];

  if (activeContainerIndex === overContainerIndex) {
    newContainers[activeContainerIndex].authorities = arrayMove(
      newContainers[activeContainerIndex].authorities,
      activeServiceIndex,
      overServiceIndex
    );
  } else {
    const [removedService] = newContainers[
      activeContainerIndex
    ].authorities.splice(activeServiceIndex, 1);
    newContainers[overContainerIndex].authorities.splice(
      overServiceIndex,
      0,
      removedService
    );
  }

  setContainers(newContainers);
};
export function handleDragEnd(event, containers, setContainers, setActiveId) {
  const { active, over, newIndex } = event;

  if (!active || !over || active.id === over.id) {
    setActiveId(null);
    return;
  }

  if (
    active.type === "service" &&
    over.type === "service" &&
    active.id !== over.id
  ) {
    const activeContainer = findValueOfservices(active.id, containers);
    const overContainer = findValueOfservices(over.id, containers);

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      return;
    }

    const activeContainerIndex = containers.findIndex(
      (container) => container.id === activeContainer.id
    );
    const overContainerIndex = containers.findIndex(
      (container) => container.id === overContainer.id
    );

    const activeServiceIndex = activeContainer.authorities.findIndex(
      (authority) => authority.authId === active.id
    );
    const overServiceIndex = overContainer.authorities.findIndex(
      (authority) => authority.authId === over.id
    );

    let newContainers = [...containers];

    if (activeContainerIndex === overContainerIndex) {
      const sortedItem =
        newContainers[activeContainerIndex].authorities[activeServiceIndex];
      newContainers[activeContainerIndex].authorities.splice(
        activeServiceIndex,
        1
      );
      newContainers[activeContainerIndex].authorities.splice(
        overServiceIndex,
        0,
        sortedItem
      );
    } else {
      const [removedService] = newContainers[
        activeContainerIndex
      ].authorities.splice(activeServiceIndex, 1);
      newContainers[overContainerIndex].authorities.splice(
        overServiceIndex + 1,
        0,
        removedService
      );
    }

    setContainers(newContainers);
    setActiveId(null);
    return;
  }

  setActiveId(null);
}
// export function handleDragEnd(event, containers, setContainers, setActiveId) {
//   const { active, over } = event;

//   // Handling Container Sorting
//   if (active && over && active.id !== over.id) {
//     // Find the index of the active and over container
//     const activeContainerIndex = containers.findIndex(
//       (container) => container.id === active.id
//     );
//     const overContainerIndex = containers.findIndex(
//       (container) => container.id === over.id
//     );
//     // Swap the active and over container
//     let newservices = [...containers];
//     newservices = arrayMove(
//       newservices,
//       activeContainerIndex,
//       overContainerIndex
//     );
//     setContainers(newservices);
//   }

//   // Handling service Sorting
//   if (active && over && active.id !== over.id) {
//     // Find the active and over container
//     const activeContainer = findValueOfservices(active.id, containers);
//     const overContainer = findValueOfservices(over.id, containers);

//     // If the active or over container is not found, return
//     if (!activeContainer || !overContainer) return;
//     // Find the index of the active and over container
//     const activeContainerIndex = containers.findIndex(
//       (container) => container.id === activeContainer.id
//     );
//     const overContainerIndex = containers.findIndex(
//       (container) => container.id === overContainer.id
//     );
//     // Find the index of the active and over service
//     const activeserviceIndex = activeContainer.authorities.findIndex(
//       (authority) => authority.authId === active.id
//     );
//     const overserviceIndex = overContainer.authorities.findIndex(
//       (authority) => authority.authId === over.id
//     );

//     // In the same container
//     if (activeContainerIndex === overContainerIndex) {
//       let newservices = [...containers];
//       newservices[activeContainerIndex].authorities = arrayMove(
//         newservices[activeContainerIndex].authorities,
//         activeserviceIndex,
//         overserviceIndex
//       );
//       setContainers(newservices);
//     } else {
//       // In different containers
//       let newservices = [...containers];
//       const [removedservice] = newservices[
//         activeContainerIndex
//       ].services.splice(activeserviceIndex, 1);
//       newservices[overContainerIndex].services.splice(
//         overserviceIndex,
//         0,
//         removedservice
//       );
//       setContainers(newservices);
//     }
//   }
//   // Handling service dropping into Container
//   if (active && over && active.id !== over.id) {
//     // Find the active and over container
//     const activeContainer = findValueOfservices(active.id, containers);
//     const overContainer = findValueOfservices(over.id, containers);

//     // If the active or over container is not found, return
//     if (!activeContainer || !overContainer) return;
//     // Find the index of the active and over container
//     const activeContainerIndex = containers.findIndex(
//       (container) => container.id === activeContainer.id
//     );
//     const overContainerIndex = containers.findIndex(
//       (container) => container.id === overContainer.id
//     );
//     // Find the index of the active and over service
//     const activeserviceIndex = activeContainer.authorities.findIndex(
//       (authority) => authority.authId === active.id
//     );

//     let newservices = [...containers];
//     const [removedservice] = newservices[
//       activeContainerIndex
//     ].authorities.splice(activeserviceIndex, 1);
//     newservices[overContainerIndex].authorities.push(removedservice);
//     setContainers(newservices);
//   }
//   setActiveId(null);
// }
export async function handleSubmitUserAuths(containers, userId) {
  console.log(userId);
  try {
    let hitResult = await AxiosHit({
      method: "put",
      url: "/user-auth",
      data: {
        services: containers[0].authorities,
        userId: userId,
      },
    });
    console.log(hitResult);
  } catch (error) {
    console.error();
  }
}
