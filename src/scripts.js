// imports
import "./css/styles.css";
import displayUserInfo, { displayHydroData, displaySleepData } from "./domUpdates.js";
import { fetchUserData, fetchHydrationData, fetchSleepData, fetchActivityData, submitSleepData } from "./apiCalls.js";
import { setLoggedInUser, getLoggedInUser, getRandomIndex, getUserDataById, avgSteps, setUserData } from "./userDataFunctions.js";

import { specificOuncesByDay, getHydrationData, weekOfHydroData, setHydroData } from "./hydrationDataFunctions.js";
import { getAverageSleepHours, getAverageSleepQuality, setSleepData, sleepHoursForWeek, sleepQualityForWeek, specificSleepHoursByDay, specificSleepQualityByDay } from "./sleepDataFunctions.js";

// Global variables
let userData = [];
let hydroData = [];
let sleepData = [];
let userSteps = 0;

var addSleepBttn = document.querySelector('.add-sleep-data')
var sleepForm = document.querySelector('.sleep-form')
var submitBttn = document.querySelector('.submit-button')
addSleepBttn.addEventListener('click', ()=> {
  sleepForm.classList.remove('hidden')
  addSleepBttn.classList.add('hidden')
})
submitBttn.addEventListener('click', submitSleepData)

function fetchAllData() {
  Promise.all([fetchUserData(), fetchHydrationData(), fetchSleepData()])
    .then(([userDataResult, hydrationDataResult, sleepDataResult]) => {
      initializeUserData(userDataResult);
      const hydrationData = initializeHydrationData(hydrationDataResult);
      console.log(hydrationData);
      const loggedInUser = getLoggedInUser();
      displayUserInfo(loggedInUser, userData);

      const date = "2023/07/01";
      const ouncesByDate = hydrationData.ouncesByDate;
      const usersOunces = hydrationData.usersOunces;
      const weekOfHydro = hydrationData.weekOfHydro;
      displayHydroData(date, weekOfHydro, usersOunces, ouncesByDate);

      console.log("Fetched Sleep Data:", sleepDataResult);
      const fetchedSleepData = initializeSleepData(sleepDataResult);
      console.log("Sleep data initialized:", fetchedSleepData);

      const avgSleepHours = fetchedSleepData.avgSleepHours;
      const avgSleepQuality = fetchedSleepData.avgSleepQuality;
      const sleepHoursByDay = fetchedSleepData.sleepHoursByDay;
      const hoursSleptThisWeek = fetchedSleepData.hoursSleptThisWeek;
      const sleepQualityByDay = fetchedSleepData.sleepQualityByDay;
      const sleepQualityByWeek = fetchedSleepData.sleepQualityByWeek;
      console.log(sleepQualityByWeek);

      displaySleepData(
        avgSleepHours,
        avgSleepQuality,
        sleepHoursByDay,
        sleepQualityByDay,
        hoursSleptThisWeek,
        sleepQualityByWeek
      );
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

// functions
function initializeUserData(data) {
  userData = data;
  setUserData(data);
  userSteps = avgSteps(userData);
  const randomUser = getUserDataById(getRandomIndex(userData), userData);
  setLoggedInUser(randomUser.id);
}

function initializeHydrationData(data) {
  console.log("Initializing Hydration Data with:", data);
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
  const loggedInUser = getLoggedInUser();
  const avgSleepHours = getAverageSleepHours(loggedInUser, sleepData);
  const avgSleepQuality = getAverageSleepQuality(loggedInUser, sleepData);
  const sleepHoursByDay = specificSleepHoursByDay(
    "2023/07/01",
    sleepData,
    loggedInUser
  );
  const sleepQualityByDay = specificSleepQualityByDay(
    "2023/07/01",
    sleepData,
    loggedInUser
  );
  const hoursSleptThisWeek = sleepHoursForWeek(
    loggedInUser,
    sleepData,
    "2023/05/26"
  );
  const sleepQualityByWeek = sleepQualityForWeek(
    loggedInUser,
    sleepData,
    "2023/05/26"
  );
  return {
    avgSleepHours,
    avgSleepQuality,
    sleepHoursByDay,
    sleepQualityByDay,
    hoursSleptThisWeek,
    sleepQualityByWeek,
  };
}

fetchAllData();

export { getLoggedInUser };
