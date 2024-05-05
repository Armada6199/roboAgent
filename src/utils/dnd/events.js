import { arrayMove } from "@dnd-kit/sortable";
function debounce(func, delay) {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}
export function onDragStart(event, setActiveAuthority) {
  setActiveAuthority(event.active.data.current.authority);
  return;
}

export function onDragOver(event, setAuthorities) {
  const { active, over } = event;
  if (!over) return;
  const debouncedSetAuthorities = debounce(setAuthorities, 150);

  const activeId = active.id;
  const overId = over.id;
  if (activeId === overId) return;

  const isActiveATask = active.data.current?.type === "authority";
  const isOverATask = over.data?.current?.type === "authority";
  // if (!isActiveATask) return;

  // Im dropping a Task over another Task
  if (isActiveATask && isOverATask) {
    debouncedSetAuthorities((authorities) => {
      const activeIndex = authorities.findIndex(
        (auth) => auth.authId === activeId
      );
      const overIndex = authorities.findIndex((auth) => auth.authId === overId);
      authorities[activeIndex].containerValue =
        authorities[overIndex].containerValue;
      console.log(arrayMove(authorities, activeIndex, overIndex));
      return arrayMove(authorities, activeIndex, overIndex);
    });
  }
  // Im dropping a Task over a container
  const draggedContainer = active.data?.current?.authority?.containerValue;
  const overContainer = over.data?.current?.authority?.containerValue;
  if (draggedContainer !== overContainer) {
    debouncedSetAuthorities((authorities) => {
      const activeIndex = authorities.findIndex(
        (auth) => auth?.authId === activeId
      );
      authorities[activeIndex].containerValue = overContainer;

      return arrayMove(authorities, activeIndex, activeIndex);
    });
  }
}
export function onDragEnd(event, setActiveContainer, setActiveAuthority) {
  setActiveContainer(null);
  setActiveAuthority(null);
  const { active, over } = event;
  if (!over) return;

  const activeId = active.id;
  const overId = over.id;

  if (activeId === overId) return;
}
// Usage:
