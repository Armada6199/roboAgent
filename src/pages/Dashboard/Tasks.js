import { FormGroup } from "@material-ui/core";
import DashCard from "./DashCard";
import DashCardHeader from "./DashCardHeader";
import TasksItem from "./TasksItem";
import { styled } from "@mui/material";

// style
const FormGroupStyle = styled(FormGroup)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(2),
}));

// list of tasks
const TASK_LIST = [
  { id: "chk_1", label: "Close the target", status: false },
  { id: "chk_2", label: "Send Reminder on UM Email", status: false },
  { id: "chk_3", label: "Start the Automation", status: false },
  { id: "chk_4", label: "Manual Script genrate", status: true },
  { id: "chk_5", label: "Sprint Showcase", status: false },
];

const Tasks = () => {
  return (
    <DashCard>
      <DashCardHeader title="Tasks" />

      <FormGroupStyle>
        {TASK_LIST.map((el) => (
          <TasksItem
            key={el.id}
            id={el.id}
            status={el.status}
            label={el.label}
            checkOptions={() => {}}
          />
        ))}
      </FormGroupStyle>
    </DashCard>
  );
};

export default Tasks;
