//imports
import { fetchHydrationData } from "./apiCalls.js";
import { getLoggedInUser } from "./userDataFunctions";

//functions
function initializeHydrationData() {
  return fetchHydrationData().then((hydroData) => {
    const loggedInUser = getLoggedInUser();
    const weekOfHydro = weekOfHydroData(loggedInUser, hydroData);
    const usersOunces = getHydrationData(loggedInUser, hydroData);
    const ouncesByDate = specificOuncesByDay(
      "2023/07/01",
      hydroData,
      loggedInUser
    );
    console.log("newFetchedHydroData", hydroData);
    return { weekOfHydro, usersOunces, ouncesByDate };
  });
}

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

//exports
export {
  initializeHydrationData,
  getHydrationData,
  specificOuncesByDay,
  weekOfHydroData,
};
