import AxiosHit from "../AxiosHit";

export async function handleVerifyEmail(
  email,
  sendOtp,
  setSnackbarText,
  setIsSnackbarOpen
) {
  console.log(email);
  try {
    const response = await AxiosHit({
      method: "post",
      url: `/forgot-password/verify-mail/${email}`,
    });
    console.log(response);
    if (response.success) {
      setSnackbarText("An Email Has been sent to you with the OTP");
      sendOtp();
    } else {
      console.log(response);
      setSnackbarText(response.resultDescription);
    }
    setIsSnackbarOpen(true);

    // if (response.success) {
    // } else {
    // }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleVerifyOTP(
  email,
  otp,
  openNewPass,
  setIsSnackbarOpen,
  setSnackbarText
) {
  try {
    const response = await AxiosHit({
      method: "post",
      url: "/forgot-password/verify-otp",
      data: {
        email: email,
        otp: otp,
      },
    });
    if (response.success) {
      openNewPass();
    } else {
      setSnackbarText("Something Went wrong please try again");
      setIsSnackbarOpen(true);
    }
    console.log(response);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleRestPassword(
  email,
  newPass,
  closeNewPassDialog,
  setSnackbarText
) {
  try {
    const response = await AxiosHit({
      method: "post",
      url: "/forgot-password/change-password",
      data: {
        email: email,
        password: newPass,
      },
    });
    if (response.success) {
      setSnackbarText("Your password has been changed successfully");
      closeNewPassDialog();
    } else {
      throw new Error("Something Went Wrong please try again");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
