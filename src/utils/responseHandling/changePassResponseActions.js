import { getResponseShape } from "./getReshapedResponse";

export function handleChangePassCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { handleNext, setAlertInfo } = utils;

  const { message, success } = getResponseShape(header, code);
  if (success == "success") handleNext();
  setAlertInfo({ alertType: success, alertMsg: message });
}
