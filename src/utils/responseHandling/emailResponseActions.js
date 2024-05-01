import i18n from "src/dictonaries/i18n";

export function handleEmailCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { status, arabicMsg, englishMsg } = header.responseStatus;
  const { handleNext, setAlertInfo, setOtpToken } = utils;
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
  console.log(success);
  if (success == "success") {
    setOtpToken(result.headers["authorization"]);
    handleNext();
  }
  setAlertInfo({ alertType: success, alertMsg: message });
}
