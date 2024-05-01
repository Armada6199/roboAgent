export function JWTFalureHitHandle() {
  window.location = "auth/login";
  localStorage.removeItem("userInfo");
}
