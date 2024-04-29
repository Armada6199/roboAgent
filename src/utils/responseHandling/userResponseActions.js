import i18next from "i18next";
import { generalSuccessReducer } from "src/hooks/reducers/store";

export async function handleUserCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { status, arabicMsg, englishMsg } = header.responseStatus;
  const { setAlertInfo } = utils;
  const reshapeData = () => {
    const currentLang = i18next.language;
    switch (code) {
      ///success
      case "00000":
        return {
          message: currentLang == "ar" ? arabicMsg : englishMsg,
          alertStatus: status,
          success: true,
        };
      default: {
        return {
          message: currentLang == "ar" ? arabicMsg : englishMsg,
          alertStatus: "error",
        };
      }
    }
  };
  const { message, alertStatus, success } = reshapeData();
  if (success) {
    console.log("success");
    generalSuccessReducer(result, utils);
  }
  setAlertInfo({
    alertType: alertStatus,
    alertMsg: message,
  });
}
