import AxiosHit from "../AxiosHit";

export async function handleVerifyEmail(email, handleNext, setSnackbarData) {
  console.log(email);
  try {
    const response = await AxiosHit({
      method: "post",
      url: `/forgot-password/verify-mail/${email}`,
    });
    if (response.success) {
      handleNext();
      setSnackbarData({
        status: "success",
        title: "An email has been sent to you with the OTP",
        open: true,
      });
    } else {
      setSnackbarData({
        status: "warning",
        title: "Something Went Wrong please Try Again",
        open: true,
      });
    }

    // if (response.success) {
    // } else {
    // }
  } catch (error) {
    setSnackbarData({
      status: "error",
      title: error,
      open: true,
    });
    throw new Error(error);
  }
}
export async function handleVerifyOTP(email, otp, handleNext, setSnackbarData) {
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
      handleNext();
    } else {
      setSnackbarData({
        status: "error",
        title: "Something Went Wrong please Try Again",
        open: true,
      });
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
