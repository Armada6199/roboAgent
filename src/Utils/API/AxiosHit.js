import axios from "axios";
import { successHitHandle } from "../HitHandiling";

axios.defaults.baseURL = "http://localhost:3000/api";
// axios.defaults.headers.common["authorization"] = ;
if (JSON.parse(localStorage.getItem("userInfo"))) {
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  axios.defaults.headers.common["authorization"] = token;
}
export default async function AxiosHit(config, utils) {
  let result = await axios(config).then((successResponse) =>
    successHitHandle(successResponse, utils)
  );
  // .catch((errorResponse) => JWTFalureHitHandle(errorResponse, utils));
  console.log(result);
  return result;
}
