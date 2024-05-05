import axios from "axios";
import { successHitHandle } from "../HitHandiling";
import { JWTFalureHitHandle } from "../responseHandling/jwtfailureResponseHandling";

axios.defaults.baseURL = "http://localhost:3000/api";
if (JSON.parse(localStorage.getItem("userInfo"))) {
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  axios.defaults.headers.common["authorization"] = token;
}
export default async function AxiosHit(config, utils) {
  let result = await axios(config)
    .then((successResponse) => successHitHandle(successResponse, utils))
    .catch((errorResponse) => JWTFalureHitHandle(errorResponse));
  return result;
}
