export async function handleUserCodeActions(result, code, status) {
  const { header, body } = result.data.roboAgentRs;
  console.log(code);
  switch (code) {
    ///success
    case "00000": {
      return {
        data: body.result,
        description: result.roboAgentRs.header.englishMsg,
      };
    }
    //email not registered
    case "00001": {
      console.log("login failed", result.roboAgentRs.header.englishMsg);
      return {
        description: header.responseStatus.englishMsg,
        alertType: "error",
        success: false,
      };
    }
    //user not allowed
    case "00002": {
      return {
        description: header.responseStatus.englishMsg,
        alertType: "warning",
        success: false,
      };
    }
    //email/password are incorrect
    case "00003": {
      console.log("incorrect password");
      return {
        description: header.responseStatus.englishMsg,
        alertType: "error",
        success: false,
      };
    }
    //Failed, only Admin/leader allowed
    case "00004": {
      return {
        description: header.responseStatus.englishMsg,
        alertType: "warning",
        success: false,
      };
    }
    case "00005": {
      return {
        description: header.responseStatus.englishMsg,
        success: false,
      };
    }
    //name should not be empty or null
    case "00006": {
      return {
        description: header.responseStatus.englishMsg,
        alertType: "error",
        success: false,
      };
    }
    //could not save the user,Email already registered
    case "00007": {
      return {
        description: header.responseStatus.englishMsg,
        alertType: "error",
        success: false,
      };
    }
  }
}
