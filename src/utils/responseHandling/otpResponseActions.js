import i18n from "src/dictonaries/i18n";
import { getResponseShape } from "./getReshapedResponse";

export function handleOTPCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { handleNext, setAlertInfo } = utils;

  const { message, success } = getResponseShape(header.code);
  if (success == "success") handleNext();
  setAlertInfo({ alertType: success, alertMsg: message });
}
