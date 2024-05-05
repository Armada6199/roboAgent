import i18next from "i18next";

export const getResponseShape = (header, code) => {
  const currentLang = i18next.language;
  const { status, arabicMsg, englishMsg } = header.responseStatus;

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
