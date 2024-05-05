import { generalSuccessReducer } from "src/hooks/reducers/store";
import { getResponseShape } from "./getReshapedResponse";

export async function handleUserCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { setAlertInfo } = utils;
  const { message, alertStatus, success } = getResponseShape(header, code);
  if (success) {
    generalSuccessReducer(result, utils);
  }
  setAlertInfo({
    alertType: alertStatus,
    alertMsg: message,
  });
  return result;
}
