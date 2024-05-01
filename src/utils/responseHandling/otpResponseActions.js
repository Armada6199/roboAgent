import i18n from "src/dictonaries/i18n";

export function handleOTPCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { status, arabicMsg, englishMsg } = header.responseStatus;
  const { handleNext, setAlertInfo } = utils;
  const currentLang = i18n.language;
  const currentMessageLang = currentLang === "ar" ? arabicMsg : englishMsg;
  const getResponseShape = () => {
    switch (code) {
      ///success
      case "00000":
        return {
          message: currentMessageLang,
          success: status,
        };
      default: {
        return {
          message: currentMessageLang,
          success: status,
        };
      }
    }
  };
  const { message, success } = getResponseShape();
  if (success == "success") handleNext();
  setAlertInfo({ alertType: success, alertMsg: message });
}
