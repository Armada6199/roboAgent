import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Grid, Typography } from "@mui/material";
import servicesIcons from "src/constants/servicesIcons";
const DraggableServiceItem = ({ authority, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: authority.authId });

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
      alignItems={"center"}
      p={2}
      sx={{
        opacity: isDragging ? "50%" : "100%",
        boxShadow: "0px 2px 12px 1px rgba(0,0,0,0.22)",
        borderRadius: 10,
        bgcolor: isDragging
          ? index == 1
            ? "blue.main"
            : "primary.main"
          : "inherit",
        zIndex: 99,
        color: isDragging ? "white" : index == 1 ? "blue.main" : "primary.main",
      }}
    >
      <Grid item color={"inherit"}>
        {servicesIcons[authority.authId]}
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1" fontWeight={600}>
          {authority.name}
        </Typography>
      </Grid>
      <Grid item>
        <ArrowCircleRightIcon sx={{ color: "inherit" }} />
      </Grid>
    </Grid>
  );
};

export default DraggableServiceItem;
