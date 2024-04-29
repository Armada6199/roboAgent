export function handleGeneralErrorCodeActions(result) {
  const { header, body } = result.data.roboAgentRs;
  const { status, arabicMsg, englishMsg } = header.responseStatus;
  console.log(code);
  switch (code) {
    ///success
    case "00000":
      return {
        message: arabicMsg || englishMsg,
        status: status,
      };
    default: {
      return {
        message: arabicMsg || englishMsg,
        status: status,
      };
    }
  }
}
