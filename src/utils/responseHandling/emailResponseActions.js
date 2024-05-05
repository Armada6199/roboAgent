import { getResponseShape } from "./getReshapedResponse";

export function handleEmailCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { handleNext, setAlertInfo, setOtpToken } = utils;
  const { message, success } = getResponseShape(header, code);
  if (success == "success") {
    setOtpToken(result.headers["authorization"]);
    handleNext();
  }
  setAlertInfo({ alertType: success, alertMsg: message });
}
