import AxiosHit from "../AxiosHit";

export async function handleGetResponse(utils) {
  const { data, servicename, options } = utils;
  let { reason, establishmentNumber, id_number } = data;
  establishmentNumber += id_number != "" ? "-" + id_number : "";

  const selectedOptions = Object.keys(options).filter((key) =>
    options[key] ? true : false
  );
  try {
    await AxiosHit(
      {
        url: `roboAgent/get-answer?service=${servicename
          .split(" ")
          .join("_")
          .toUpperCase()}`,
        method: "post",
        baseURL: "http://localhost:3000/",
        data: {
          establishmentNumber,
          selectedOptions,
          reason,
        },
      },
      utils
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
