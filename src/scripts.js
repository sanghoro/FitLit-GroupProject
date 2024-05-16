//imports

import "./css/styles.css";
import displayUserInfo from "./domUpdates.js";
import hydration from "./data/hydration.js";
import {
  userSteps,
  getRandomIndex,
  getUserDataByID,
  usersArray,
} from "./userDataFunctions.js";
import {
  getHydrationData,
  weekOfHydroData,
  specificOuncesByDay,
} from "./hydrationDataFunctions.js";

//Global
var hydroData = hydration.hydrationData;
var randomUser = getUserDataByID(getRandomIndex(usersArray), usersArray);

// function invokations
weekOfHydroData(randomUser, hydroData);
getHydrationData(randomUser, hydroData);
specificOuncesByDay("2023/06/12", hydroData);

//must comment/uncomment below function and Queryselectors in domUpdates.js when wanting to run test in terminal
displayUserInfo(randomUser);

export { hydroData, userSteps };
