import { Alert, Snackbar } from "@mui/material";
import React from "react";

function CustomToast({ snackbarData, handleClose, isSnackbarOpen }) {
  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarData.status}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarData.text}
      </Alert>
    </Snackbar>
  );
}

export default CustomToast;
