export default apiRequests = {
  submitUserAuth: {
    method: "put",
    url: "/user-auth",
    data: {
      roboAuthorities: roboAuthorities,
      userId: userId,
    },
  },
  fetchRoboAuth: {
    method: "get",
    url: "/user-auth",
  },
  submitUserRole: {
    method: "put",
    url: `/user-roles/${userId}/roles/${newRole}`,
  },
};
// "service":"GET_ALL_SERVICE",
// "GET_ALL_AUTHORITIES"

//   "REGISTER_NEW_USER"

//   "UPDATE_USER_ROLE"

//   "UPDATE_USER_AUTHORITIES"

//   "UPDATE_USER_TEAM"
