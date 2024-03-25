import axios from "axios";
import { HitHandle } from "../../Utils/HitHandiling";

axios.defaults.baseURL = "http://10.150.8.187:9000/api/";
if (localStorage.getItem("authorization")) {
  axios.defaults.headers.common["authorization"] =
    localStorage.getItem("authorization");
}

export default function AxiosHit(config) {
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
  let result = axios(config).then(handleSuccess).catch(handleFailure);
  return result;
}
