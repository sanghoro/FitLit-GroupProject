let newHydroData = [];

function getHydrationData(user, hydroArray) {
  const userHydroData = hydroArray.filter((userP) => userP.userID === user.id);
  const totalOunces = userHydroData.reduce(
    (total, day) => total + day.numOunces,
    0
  );
  return totalOunces / userHydroData.length;
}
function specificOuncesByDay(date, hydroArray, user) {
  const userHydroData = hydroArray.filter((userP) => userP.userID === user.id);
  const specificDate = userHydroData.find((day) => day.date === date);
  return specificDate ? specificDate.numOunces : 0;
}
function weekOfHydroData(user, hydroArray) {
  const userHydroData = hydroArray.filter((userP) => userP.userID === user.id);
  return userHydroData.slice(-7).reverse();
}

function setHydroData(data) {
  newHydroData = data;
}

// exports
export { getHydrationData, specificOuncesByDay, weekOfHydroData, setHydroData };
