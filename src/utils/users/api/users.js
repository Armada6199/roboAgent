import AxiosHit from "src/utils/api/AxiosHit";
export async function handleSubmitUserAuths(utils) {
  const { roboAuthorities, userId } = utils;
  try {
    await AxiosHit(
      {
        method: "put",
        url: "/user-auth",
        data: {
          roboAuthorities: roboAuthorities,
          userId: userId,
        },
      },
      utils
    );
  } catch (error) {
    console.error(error);
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

export async function handleSubmitNewUser(userData, utils) {
  try {
    const r = await AxiosHit(
      {
        url: "/users/signup",
        method: "post",
        data: userData,
      },
      utils
    );
    handleSubmitUserAuths({
      roboAuthorities: userData.roboAuthorities,
      userId: r.data.roboAgentRs.body.user.userId,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
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
        url: "users/getallusers?size=40",
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
