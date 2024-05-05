import { getResponseShape } from "./getReshapedResponse";

export function handleGeneralErrorCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { setAlertInfo } = utils;

  const { message, success } = getResponseShape(header, code);
  setAlertInfo({ alertType: success, alertMsg: message });
}
