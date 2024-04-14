import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Grid, Typography } from "@mui/material";
import servicesIcons from "src/constants/servicesIcons";
const DraggableServiceItem = ({ service }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: service.authId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Grid
      container
      ref={setNodeRef}
      style={style}
      gap={2}
      {...attributes}
      {...listeners}
      sx={{
        opacity: isDragging ? "50%" : "100%",
      }}
    >
      <Grid item>{servicesIcons[service.authId]}</Grid>
      <Grid item>
        <Typography variant="body1" fontWeight={600}>
          {service.name}
        </Typography>
      </Grid>
      <Grid item>
        <ArrowCircleRightIcon sx={{ color: "primary.main" }} />
      </Grid>
    </Grid>
  );
};

export default DraggableServiceItem;
