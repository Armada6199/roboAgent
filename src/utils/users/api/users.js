import AxiosHit from "src/utils/api/AxiosHit";
import { handleFilterServices, reshapeUserData } from "../tableUtils";
export async function handleSubmitUserAuths(userId, newAuthorities) {
  try {
    await AxiosHit({
      method: "put",
      url: "/user-auth",
      data: {
        services: newAuthorities,
        userId: userId,
      },
    });
  } catch (error) {
    console.error();
  }
}
export const handleFetchAuthorities = async (utils) => {
  try {
    await AxiosHit(
      {
        method: "get",
        url: "/user-auth",
      },
      utils
    );
  } catch (error) {
    throw new Error(error);
  }
};
export async function hanldeSubmitUserNewRole(utils) {
  const { userId, newRole } = utils;
  try {
    await AxiosHit(
      {
        method: "put",
        url: `/user-roles/${userId}/roles/${newRole}`,
      },
      utils
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export function handleSetContainerService(
  activeServices,
  services,
  containers,
  setContainers
) {
  const newServices = handleFilterServices(activeServices, services);
  const newContainer = [...containers];
  // console.log(newServices);
  newContainer[0].authorities = newServices;
  newContainer[1].authorities = activeServices;
  setContainers(newContainer);
}
export async function handleSubmitUserNewService(utils) {
  const { userId, userNewService } = utils;
  console.log();
  try {
    await AxiosHit(
      {
        method: "put",
        url: `service/${userId}/service/${userNewService}`,
      },
      utils
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleFetchAllUsers(utils) {
  try {
    await AxiosHit(
      {
        url: "users/getallusers?size=10",
        method: "get",
      },
      utils
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleFetchServiceList(utils) {
  try {
    await AxiosHit(
      {
        method: "get",
        url: "/service",
      },
      utils
    );
  } catch (error) {
    throw new Error(error);
  }
}
export async function handleSubmitNewUser(utils) {
  try {
    await AxiosHit(
      {
        method: "post",
        url: "users/signup",
        data: utils.data,
      },
      utils
    );
  } catch (error) {
    throw new Error(error);
  }
}
