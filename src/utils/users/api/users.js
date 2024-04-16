import AxiosHit from "src/utils/api/AxiosHit";
import { handleFilterServices, reshapeUserData } from "../tableUtils";
export async function handleSubmitUserAuths(userId, newAuthorities) {
  try {
    let hitResult = await AxiosHit({
      method: "put",
      url: "/user-auth",
      data: {
        services: newAuthorities,
        userId: userId,
      },
    });
    console.log(hitResult);
  } catch (error) {
    console.error();
  }
}
export const handleFetchAuthorities = async (
  setAuthorities,
  getOnlyUserAuthorities = false
) => {
  try {
    let hitResult = await AxiosHit({
      method: "get",
      url: "/user-auth",
    });
    if (getOnlyUserAuthorities) {
      setAuthorities(hitResult.data.user.services);
      return;
    }
    setAuthorities(hitResult.data.services);
    console.log(hitResult.data.services);
    return hitResult.data.services;
  } catch (error) {
    throw new Error(error);
  }
};
export function handleSetContainerService(
  activeServices,
  services,
  containers,
  setContainers
) {
  const newServices = handleFilterServices(activeServices, services);
  const newContainer = Object.create(containers);
  newContainer[0].services = newServices;
  setContainers(newContainer);
}
export async function handleFetchUserData(setTableData) {
  try {
    const response = await AxiosHit({
      url: "users/getallusers?size=10",
      method: "get",
    });
    const newUsersDataReshaped = reshapeUserData(response?.data?.users);
    setTableData({
      usersData: newUsersDataReshaped,
      userId: response.data.user.userId,
    });
  } catch (error) {
    throw new Error(error);
  }
}
