import AxiosHit from "../api/AxiosHit";
import { debounce } from "lodash";

const { arrayMove } = require("@dnd-kit/sortable");

function findValueOfservices(authId, containers) {
  for (const container of containers) {
    const authority = container.authorities.find(
      (authority) => authority.name == authId
    );
    if (authority) {
      return container;
    }
  }
  return null; // Or any other value indicating that no container was found
}
export const handleDragStart = (event, setActiveId) => {
  const { active } = event;
  setActiveId(active.id);
};

///service drop to another container
// export const handleDragMove = (event, containers, setContainers) => {
//   const { active, over } = event;

//   if (!active || !over || active.id === over.id) return;

//   const activeContainer = findValueOfservices(active.id, containers);
//   const overContainer = findValueOfservices(over.id, containers);

//   if (!activeContainer || !overContainer) return;

//   const activeContainerIndex = containers.findIndex(
//     (container) => container.id === activeContainer.id
//   );
//   const overContainerIndex = containers.findIndex(
//     (container) => container.id === overContainer.id
//   );

//   const activeServiceIndex = activeContainer.authorities.findIndex(
//     (authority) => authority.authId === active.id
//   );
//   const overServiceIndex = overContainer.authorities.findIndex(
//     (authority) => authority.authId === over.id
//   );

//   let newContainers = [...containers];

//   if (activeContainerIndex === overContainerIndex) {
//     newContainers[activeContainerIndex].authorities = arrayMove(
//       newContainers[activeContainerIndex].authorities,
//       activeServiceIndex,
//       overServiceIndex
//     );
//   } else {
//     const [removedService] = newContainers[
//       activeContainerIndex
//     ].authorities.splice(activeServiceIndex, 1);
//     newContainers[overContainerIndex].authorities.splice(
//       overServiceIndex,
//       0,
//       removedService
//     );
//   }

//   setContainers(newContainers);
// };

export const handleDragMove = (
  event,
  containers,
  setContainers,
  setActiveId
) => {
  const { active, over } = event;
  if (!active || !over || active.id === over.id) return;

  const activeId = Number(active.id);
  const overId = Number(over.id);

  const activeContainerIndex = containers.findIndex(
    (container) => container.id === activeId
  );
  const overContainerIndex = containers.findIndex(
    (container) => container.id === overId
  );

  if (activeContainerIndex === -1 || overContainerIndex === -1) return;

  const activeContainer = containers[activeContainerIndex];
  const overContainer = containers[overContainerIndex];

  const activeIndex = activeContainer.authorities.findIndex(
    (authority) => authority.authId === activeId
  );

  if (activeIndex === -1) return;

  const newContainers = [...containers];

  // If dragging within the same container
  if (activeContainer === overContainer) {
    const sortedAuthorities = arrayMove(
      activeContainer.authorities,
      activeIndex,
      calculateIndex(over, event)
    );
    newContainers[activeContainerIndex] = {
      ...activeContainer,
      authorities: sortedAuthorities,
    };
  } else {
    // If dragging to a different container
    const [movedAuthority] = newContainers[
      activeContainerIndex
    ].authorities.splice(activeIndex, 1);
    const overIndex = calculateIndex(over, event);
    newContainers[overContainerIndex] = {
      ...overContainer,
      authorities: [
        ...overContainer.authorities.slice(0, overIndex),
        movedAuthority,
        ...overContainer.authorities.slice(overIndex),
      ],
    };
  }

  setContainers(newContainers);
};
const calculateIndex = (over, event) => {
  const { active, over: overContainer } = event;
  const overRect = overContainer.getBoundingClientRect();
  const relativePosition = event.clientY - overRect.top;
  const childNodes = Array.from(overContainer.childNodes);
  let index = childNodes.findIndex(
    (node) => node.contains(over) || node === over
  );

  if (index === -1) {
    index = active.id < over.id ? childNodes.length : 0;
  }

  return relativePosition > overRect.height / 2 ? index + 1 : index;
};
export const handleDragEnd = (
  event,
  containers,
  setContainers,
  setActiveId
) => {
  setActiveId(null);
};

export async function handleSubmitUserAuths(utils) {
  const { userId, containers } = utils;
  console.log(userId, "FSDFSFDSF");
  try {
    let hitResult = await AxiosHit(
      {
        method: "put",
        url: "/user-auth",
        data: {
          roboAuthorities: containers[1].authorities,
          userId: userId,
        },
      },
      utils
    );
    console.log(hitResult);
  } catch (error) {
    console.error();
  }
}

function findServiceIndex(container, serviceId) {
  return container.authorities.findIndex(
    (authority) => authority.name === serviceId
  );
}
