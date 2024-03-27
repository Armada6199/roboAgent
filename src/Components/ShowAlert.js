import React, { useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import { useAlert, useUpdateAlert } from "../hooks/Context/AlertContext";
export default function ShowAlert() {
  const [openFailerAlert, setOpenFailerAlert] = useState(false);
  const setAlertInfo = useUpdateAlert();
  const alertInfo = useAlert();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    (async () => {
      console.log(alertInfo);
      if (!!alertInfo) {
        setOpenFailerAlert(true);
        window.scroll(0, 0);
        await sleep(5000);
        setOpenFailerAlert(false);
        setAlertInfo(null);
        if (!!alertInfo.redirectTo) {
          console.log("redirect ??");
          window.location.href = alertInfo.redirectTo;
        }
      } else {
        setOpenFailerAlert(false);
      }
    })();
  }, [alertInfo, setAlertInfo]);
  console.log("alertInfo ====> ", alertInfo);
  if (!!alertInfo) {
    return (
      <Collapse in={openFailerAlert}>
        <Alert variant="filled" severity={alertInfo.alertType}>
          {alertInfo.alertMsg}
        </Alert>
      </Collapse>
    );
  } else {
    return "";
  }
}
