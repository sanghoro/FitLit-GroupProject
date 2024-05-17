import hydration from "./data/hydration";
import { loggedInUser } from "./userDataFunctions";

// Global
var hydroData = hydration.hydrationData;

var weekOfHydro = weekOfHydroData(loggedInUser, hydroData);
var usersOunces = getHydrationData(loggedInUser, hydroData);
var ouncesByDate = specificOuncesByDay("2023/03/24", hydroData, loggedInUser);

// Functions
function getHydrationData(user, hydroData) {
  var userHydroData = hydroData.filter((userP) => userP.userID === user.id);

  const totalOunces = userHydroData.reduce(
    (total, day) => total + day.numOunces,
    0
  );

  const averageOunces = totalOunces / userHydroData.length;

  return averageOunces;
}

function specificOuncesByDay(date, hydroData, user) {
  var userHydroData = hydroData.filter((userP) => userP.userID === user.id);
  const specificDate = userHydroData.find((day) => day.date === date);
  return specificDate ? specificDate.numOunces : 0;
}

function weekOfHydroData(user, hydroData) {
  const userHydroData = hydroData.filter((userP) => userP.userID === user.id);

  const weekData = userHydroData.slice(-7);
  return weekData;
}

export {
  hydroData,
  getHydrationData,
  weekOfHydroData,
  specificOuncesByDay,
  weekOfHydro,
  usersOunces,
  ouncesByDate,
};
