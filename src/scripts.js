//imports

import "./css/styles.css";
import displayUserInfo, { displayHydroData } from "./domUpdates.js";
import hydration from "./data/hydration.js";
import {
  userSteps,
  getRandomIndex,
  getUserDataById,
  usersArray,
} from "./userDataFunctions.js";
import { hydroData, usersOunces, weekOfHydro, weekOfHydroData, ouncesByDate} from "./hydrationDataFunctions.js";

//Global
// var hydroData = hydration.hydrationData;
var randomUser = getUserDataById(getRandomIndex(usersArray), usersArray);

// function invokations
// weekOfHydroData(randomUser, hydroData);
// getHydrationData(randomUser, hydroData);
// specificOuncesByDay("2023/06/12", hydroData);



//must comment/uncomment below function and Queryselectors in domUpdates.js when wanting to run test in terminal
displayUserInfo(randomUser);
console.log('::::,', weekOfHydro)
displayHydroData(weekOfHydro,usersOunces)

export { hydroData, userSteps };
