// imports
import "./css/styles.css";
import displayUserInfo, { displayHydroData } from "./domUpdates.js";
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
} from "./userDataFunctions.js";

import {
  specificOuncesByDay,
  getHydrationData,
  weekOfHydroData,
} from "./hydrationDataFunctions.js";

// Global variables
let userData;
let hydroData;
let sleepData;
let activityData;

// Functions for fetching data
function fetchAllData() {
  const userDataPromise = fetchUserData();
  const hydroDataPromise = fetchHydrationData();
  const sleepDataPromise = fetchSleepData();
  const activityDataPromise = fetchActivityData();

  return Promise.all([
    userDataPromise,
    hydroDataPromise,
    sleepDataPromise,
    activityDataPromise,
  ])
    .then((data) => {
      console.log("Data fetched successfully:", data);
      userData = data[0];
      hydroData = data[1];
      sleepData = data[2];
      activityData = data[3];

      const randomIndex = getRandomIndex(userData);
      setLoggedInUser(userData[randomIndex].id);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

function getUserData() {
  console.log("Fetching user data:", userData);
  return userData;
}

function getHydroData() {
  console.log("Fetching hydration data:", hydroData);
  return hydroData;
}

function getSleepData() {
  console.log("Fetching sleep data:", sleepData);
  return sleepData;
}

function getActivityData() {
  console.log("Fetching activity data:", activityData);
  return activityData;
}

//Initial value(?) when loaded
fetchAllData().then(() => {
  const loggedInUser = getLoggedInUser();
  displayUserInfo(loggedInUser);

  const date = "2023/07/01";
  const ouncesByDate = specificOuncesByDay(date, hydroData, loggedInUser);
  const usersOunces = getHydrationData(loggedInUser, hydroData);
  const weekOfHydro = weekOfHydroData(loggedInUser, hydroData);
  displayHydroData(date, weekOfHydro, usersOunces, ouncesByDate);
});

export { getUserData, getHydroData, getSleepData, getActivityData };
