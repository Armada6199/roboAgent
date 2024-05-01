import AxiosHit from "../AxiosHit";

export async function handleVerifyEmail(utils) {
  const { email } = utils;
  try {
    await AxiosHit(
      {
        method: "post",
        url: `/forgot-password/verify-mail/${email}`,
      },
      utils
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleVerifyOTP(utils) {
  const { token, otp } = utils;
  console.log(token);
  try {
    await AxiosHit(
      {
        method: "post",
        url: "/forgot-password/verify-otp",
        headers: { Authorization: `${token}` },
        data: {
          otp: otp,
        },
      },
      utils
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleRestPassword(utils) {
  const { newPass, otpToken } = utils;
  try {
    await AxiosHit({
      method: "post",
      url: "/forgot-password/change-password",
      headers: { Authorization: `${otpToken}` },
      data: {
        password: newPass,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
