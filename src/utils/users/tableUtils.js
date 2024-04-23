export function handleFilterServices(activeServices = [], allServices = []) {
  console.log(activeServices);
  const filteredArray2 = allServices.filter(
    (service) =>
      !activeServices.some(
        (activeService) => activeService.authId === service.authId
      )
  );
  return filteredArray2;
}
export function reshapeUserData(usersArr = []) {
  const newUsersArr = [];
  for (let user of usersArr) {
    let newUserArr = [];
    // let userId = "";
    for (let key of Object.keys(user)) {
      // if (key == "userId") {
      //   userId = user[key];
      //   continue;
      // }
      // console.log(key);
      newUserArr.push(user[key]);
    }
    // newUserArr.push(userId);

    newUsersArr.push(newUserArr);
  }
  return newUsersArr;
}
