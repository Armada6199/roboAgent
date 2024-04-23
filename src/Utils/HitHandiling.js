import { handleChangePassCodeActions } from "./responseHandling/changePassResponseActions";
import { handleEmailCodeActions } from "./responseHandling/emailResponseActions";
import { handleGeneralErrorCodeActions } from "./responseHandling/generalErrorResponseActions";
import { handleOTPCodeActions } from "./responseHandling/otpResponseActions";
import { handleUserCodeActions } from "./responseHandling/userResponseActions";
export function successHitHandle(result) {
  console.log(result.data, "result");
  const code = result.data.roboAgentRs.header.responseStatus.code;
  const status = result.data.roboAgentRs.header.responseStatus.status;
  // const message = result.data.roboAgentRs.header.responseStatus.englishMsg;
  const { codeLetters, codeNumbers } = handleExtractCodeInfo(code, "string");
  switch (codeLetters) {
    case "USR":
      return handleUserCodeActions(result, codeNumbers, status);
    case "OTP":
      return handleOTPCodeActions(result, codeNumbers, status);
    case "EML":
      return handleEmailCodeActions();
    case "CHP":
      return handleChangePassCodeActions();
    case "E":
      return handleGeneralErrorCodeActions();
  }
}
export function JWTFalureHitHandle(result) {
  console.log(result.data, "result");
  const code = result.data.roboAgentRs.header.responseStatus.code;
  const status = result.data.roboAgentRs.header.responseStatus.status;
  const message = result.data.roboAgentRs.header.responseStatus.englishMsg;
}
export function handleExtractCodeInfo(code, extractType) {
  return {
    codeLetters: code
      .split("")
      .filter((l) => isNaN(Number.parseInt(l)))
      .join(""),
    codeNumbers: code
      .split("")
      .filter((l) => !isNaN(Number.parseInt(l)))
      .join(""),
  };
}
