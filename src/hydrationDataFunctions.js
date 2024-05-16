import hydration from "./data/hydration";

import { randomUser } from "./userDataFunctions";
//global
var hydroData = hydration.hydrationData;

var weekOfHydro = weekOfHydroData(randomUser, hydroData);
var usersOunces = getHydrationData(randomUser, hydroData);
// var ouncesByDate = specificOuncesByDay("2023/06/12", randomUser);

//functions
function getHydrationData(user, hydroData) {
  var userHydroData = hydroData.filter((userP) => userP.userID === user.id);

  const totalOunces = userHydroData.reduce((total, day) => total + day.numOunces, 0);
  
  const averageOunces = totalOunces / userHydroData.length;
  
  return averageOunces;
}

// function specificOuncesByDay(date, hydroData) {
//     const specificDate = hydroData.find((day) => day.date === date && day.userID === user.id);
//     return specificDate ? specificDate.numOunces : 0;
// }

function weekOfHydroData(user, hydroData) {
  const userHydroData = hydroData.filter((userP) => userP.userID === user.id);

  const weekData = userHydroData.slice(-7);
  return weekData;
}

export { 
    hydroData, 
    getHydrationData, 
    weekOfHydroData, 
    // specificOuncesByDay, 
    weekOfHydro, 
    usersOunces,
    // ouncesByDate
 };
