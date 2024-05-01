import { redirect } from "react-router";

export function handleGeneralErrorCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { status, arabicMsg, englishMsg } = header.responseStatus;
  const { setAlertInfo } = utils;
  // redirect("/error");
  console.log("error ");
  const getResponseShape = () => {
    switch (code) {
      ///success
      case "00000":
        return {
          message: arabicMsg || englishMsg,
          success: status,
        };
      default: {
        return {
          message: arabicMsg || englishMsg,
          success: status,
        };
      }
    }
  };
  const { message, success } = getResponseShape();
  setAlertInfo({ alertType: success, alertMsg: message });
}
