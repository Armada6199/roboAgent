const { Grid, Button, Typography } = require("@mui/material");

export const columns = [
  {
    name: "FirstName",
    label: "First Name",

    options: {
      filter: true,
    },
  },
  {
    name: "middleName",
    label: "Midle Name",

    options: {
      filter: true,
    },
  },
  {
    name: "last Name",
    label: "Last Name",

    options: {
      filter: true,
    },
  },
  {
    name: "status",
    label: "Status",

    options: {
      filter: true,
    },
  },
  {
    name: "role",
    label: "Role",

    options: {
      filter: true,
    },
  },
  {
    name: "email",
    label: "Email",

    options: {
      filter: true,
    },
  },
  {
    name: "service",
    label: "Service",
    options: {
      filter: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Grid container item alignItems={"center"}>
            <Typography variant="body1">Visas</Typography>
          </Grid>
        );
      },
    },
  },
  {
    name: "services",
    label: "Services",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Grid container item alignItems={"center"}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleOpenServiceDialog(tableMeta.rowData)}
            >
              View all
            </Button>
          </Grid>
        );
      },
    },
  },
];
