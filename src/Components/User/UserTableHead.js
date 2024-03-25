import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import { Box } from "@mui/system";
import { visuallyHidden } from "@mui/utils";


const UserTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells
  } = props;
  console.log("headCells ===> ",headCells)
  // sort
  const createSortHandler = (property) => (e) => onRequestSort(e, property);

  return (
    <TableHead>
      <TableRow>
        {/* ck box */}
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all users",
            }}
          />
        </TableCell>

        {/* rest of the cells */}
        {headCells.map((cell) => (
          <TableCell
            key={cell}
            sortDirection={orderBy === cell ? order : false}
          >
            <TableSortLabel
              active={orderBy === cell}
              direction={orderBy === cell ? order : "asc"}
              onClick={createSortHandler(cell)}
            >
              {cell}

              {/* hidden box */}
              {orderBy === cell ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default UserTableHead;
