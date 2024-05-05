import { generalSuccessReducer } from "src/hooks/reducers/store";
import { handleChangePassCodeActions } from "./responseHandling/changePassResponseActions";
import { handleEmailCodeActions } from "./responseHandling/emailResponseActions";
import { handleGeneralErrorCodeActions } from "./responseHandling/generalErrorResponseActions";
import { handleGetAnswerFailure } from "./responseHandling/handleGetAnswerFailure";
import { JWTFalureHitHandle } from "./responseHandling/jwtfailureResponseHandling";
import { handleOTPCodeActions } from "./responseHandling/otpResponseActions";
import { handleUserCodeActions } from "./responseHandling/userResponseActions";

export function successHitHandle(result, utils) {
  const { code } = result?.data?.roboAgentRs?.header?.responseStatus;
  const { codeLetters, codeNumbers } = handleExtractCodeInfo(code, "string");
  switch (codeLetters) {
    case "":
      return generalSuccessReducer(result, utils);
    case "USR":
      return handleUserCodeActions(result, codeNumbers, utils);
    case "OTP":
      return handleOTPCodeActions(result, codeNumbers, utils);
    case "EML":
      return handleEmailCodeActions(result, codeNumbers, utils);
    case "CPW":
      return handleChangePassCodeActions(result, codeNumbers, utils);
    case "JWT":
      return JWTFalureHitHandle(result, codeNumbers);
    case "E":
      return handleGeneralErrorCodeActions(result, codeNumbers);
    case "GAM":
      return handleGetAnswerFailure(result, codeNumbers);
  }
}
export function handleExtractCodeInfo(code = 0) {
  return {
    codeLetters: code
      ?.split("")
      ?.filter((l) => isNaN(Number.parseInt(l)))
      ?.join(""),
    codeNumbers: code
      ?.split("")
      ?.filter((l) => !isNaN(Number.parseInt(l)))
      ?.join(""),
  };
}
