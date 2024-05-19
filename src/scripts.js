// imports
import "./css/styles.css";
import displayUserInfo, { displayHydroData, displaySleepData } from "./domUpdates.js";
import {
  fetchUserData,
  fetchHydrationData,
  fetchSleepData,
  fetchActivityData,
} from "./apiCalls.js";

import {
  setLoggedInUser,
  getLoggedInUser,
  getRandomIndex,
  getUserDataById,
  avgSteps,
  setUserData,
} from "./userDataFunctions.js";

import {
  specificOuncesByDay,
  getHydrationData,
  weekOfHydroData,
  setHydroData,
} from "./hydrationDataFunctions.js";
import { getAverageSleepHours, setSleepData } from "./sleepDataFunctions.js";

// Global variables
let userData = [];
let hydroData = [];
let sleepData = [];
let activityData = [];
let userSteps = 0;

function fetchAllData() {
  return fetchUserData()
    .then((userDataResult) => {
      initializeUserData(userDataResult);
      return fetchHydrationData();
    })
    .then((hydrationDataResult) => {
      const hydrationData = initializeHydrationData(hydrationDataResult);
      console.log(hydrationData)
      const loggedInUser = getLoggedInUser();
      displayUserInfo(loggedInUser);

      const date = "2023/07/01";
      const ouncesByDate = hydrationData.ouncesByDate;
      const usersOunces = hydrationData.usersOunces;
      const weekOfHydro = hydrationData.weekOfHydro;
      displayHydroData(date, weekOfHydro, usersOunces, ouncesByDate); 
      return fetchSleepData();
    })
    .then((sleepDataResult) => {
      const fetchedSleepData = initializeSleepData(sleepDataResult)
      console.log('sleeep::::::::', fetchedSleepData)
      
      const avgSleepHours = fetchedSleepData.avgSleepHours
      displaySleepData(avgSleepHours)
      
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

// Initializing datas
function initializeUserData(data) {
  userData = data;
  setUserData(data);
  userSteps = avgSteps(userData);
  const randomUser = getUserDataById(getRandomIndex(userData), userData);
  setLoggedInUser(randomUser.id);
}

function initializeHydrationData(data) {
  hydroData = data;
  setHydroData(data);
  const loggedInUser = getLoggedInUser();
  const weekOfHydro = weekOfHydroData(loggedInUser, hydroData);
  const usersOunces = getHydrationData(loggedInUser, hydroData);
  const ouncesByDate = specificOuncesByDay(
    "2023/07/01",
    hydroData,
    loggedInUser
  );
  return { weekOfHydro, usersOunces, ouncesByDate };
}

function initializeSleepData(data) {
  sleepData = data
  setSleepData(data)
  const loggedInUser = getLoggedInUser();
  const avgSleepHours = getAverageSleepHours(loggedInUser, sleepData)

  return { avgSleepHours} 
}


fetchAllData();
initializeSleepData()
export { getLoggedInUser };
