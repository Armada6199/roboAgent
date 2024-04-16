export function handleFilterServices(activeServices, allServices) {
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
    for (let key of Object.keys(user)) {
      if (key == "userId") continue;
      newUserArr.push(user[key]);
    }
    newUsersArr.push(newUserArr);
  }
  return newUsersArr;
}
