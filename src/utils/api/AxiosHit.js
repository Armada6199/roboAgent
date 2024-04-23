import axios from "axios";
import cookie from "react-cookies";
import { JWTFalureHitHandle, successHitHandle } from "../HitHandiling";

axios.defaults.baseURL = "http://localhost:3000/api";
// axios.defaults.baseURL = "http://192.168.4.202:9000/api/";

if (cookie.load("userInfo")) {
  // console.log(cookie.load("userInfo"));
  axios.defaults.headers.common["authorization"] =
    cookie.load("userInfo").token;
}
export default async function AxiosHit(config) {
  let result = await axios(config)
    .then((successResponse) => successHitHandle(successResponse))
    .catch((errorResponse) => JWTFalureHitHandle(errorResponse));
  console.log(result);
  return result;
}
