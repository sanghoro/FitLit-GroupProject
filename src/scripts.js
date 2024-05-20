// imports
import "./css/styles.css";
import displayUserInfo, {
  displayHydroData,
  displaySleepData,
} from "./domUpdates.js";
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
import {
  getAverageSleepHours,
  getAverageSleepQuality,
  setSleepData,
  sleepHoursForWeek,
  sleepQualityForWeek,
  specificSleepHoursByDay,
  specificSleepQualityByDay,
} from "./sleepDataFunctions.js";

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
      const loggedInUser = getLoggedInUser();
      displayUserInfo(loggedInUser, userData);

      const date = "2023/07/01";
      const ouncesByDate = hydrationData.ouncesByDate;
      const usersOunces = hydrationData.usersOunces;
      const weekOfHydro = hydrationData.weekOfHydro;
      displayHydroData(date, weekOfHydro, usersOunces, ouncesByDate);
      return fetchSleepData();
    })
    .then((sleepDataResult) => {
      const fetchedSleepData = initializeSleepData(sleepDataResult);

      const avgSleepHours = fetchedSleepData.avgSleepHours;
      const avgSleepQuality = fetchedSleepData.avgSleepQuality;
      const sleepHoursByDay = fetchedSleepData.sleepHoursByDay;
      const hoursSleptThisWeek = fetchedSleepData.hoursSleptThisWeek;

      const sleepQualityByDay = fetchedSleepData.sleepQualityByDay;
      const sleepQualityByWeek = fetchedSleepData.sleepQualityByWeek;

      displaySleepData(avgSleepHours, avgSleepQuality, sleepHoursByDay, sleepQualityByDay, hoursSleptThisWeek, sleepQualityByWeek);

    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

// Initializing data
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
  sleepData = data;
  setSleepData(data);
  sleepData = data;
  setSleepData(data);
  const loggedInUser = getLoggedInUser();
  const avgSleepHours = getAverageSleepHours(loggedInUser);
  const avgSleepQuality = getAverageSleepQuality(loggedInUser);
  const sleepHoursByDay = specificSleepHoursByDay("2023/07/01", loggedInUser);
  const sleepQualityByDay = specificSleepQualityByDay("2023/07/01", loggedInUser);
  const hoursSleptThisWeek = sleepHoursForWeek(loggedInUser, "2023/05/26");
  const sleepQualityByWeek = sleepQualityForWeek(loggedInUser, "2023/05/26");

  return { avgSleepHours, avgSleepQuality, sleepHoursByDay, sleepQualityByDay, hoursSleptThisWeek, sleepQualityByWeek };
}

fetchAllData();
export { getLoggedInUser };
