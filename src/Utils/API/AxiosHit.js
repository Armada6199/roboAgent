import axios from "axios";
import { HitHandle } from "../HitHandiling";
import cookie from "react-cookies";

axios.defaults.baseURL = "http://localhost:3000/api";
// axios.defaults.baseURL = "http://192.168.4.202:9000/api/";

if (cookie.load("userInfo")) {
  // console.log(cookie.load("userInfo"));
  axios.defaults.headers.common["authorization"] =
    cookie.load("userInfo").token;
}
export default async function AxiosHit(config) {
  function handleSuccess(result) {
    return HitHandle(result);
  }

  function handleFailure(result) {
    console.log("description", result);
    return { success: false, result: "error", description: result.toString() };
  }
  if (!!config.baseURL) {
    axios.defaults.baseURL = config.baseURL;
  }
  console.log("config ===> ", config);
  let result = await axios(config).then(handleSuccess).catch(handleFailure);
  return result;
}
