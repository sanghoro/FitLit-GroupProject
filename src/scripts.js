// imports
import "./css/styles.css";
import displayUserInfo, { displayHydroData, displaySleepData, displayActivityData } from "./domUpdates.js";
import { fetchUserData, fetchHydrationData, fetchSleepData, fetchActivityData, submitSleepData } from "./apiCalls.js";
import { setLoggedInUser, getLoggedInUser, getRandomIndex, getUserDataById, avgSteps, setUserData } from "./userDataFunctions.js";

import { specificOuncesByDay, getHydrationData, weekOfHydroData, setHydroData } from "./hydrationDataFunctions.js";
import { getAverageSleepHours, getAverageSleepQuality, setSleepData, sleepHoursForWeek, sleepQualityForWeek, specificSleepHoursByDay, specificSleepQualityByDay } from "./sleepDataFunctions.js";

// Global variables
let userData = [];
let hydroData = [];
let sleepData = [];
let activityData = [];
let userSteps = 0;

var addSleepBttn = document.querySelector('.add-sleep-data')
var sleepForm = document.querySelector('.sleep-form')
// var submitBttn = document.querySelector('.submit-button')
addSleepBttn.addEventListener('click', ()=> {
  sleepForm.classList.remove('hidden')
  addSleepBttn.classList.add('hidden')
})
sleepForm.addEventListener('submit', submitSleepData)

function fetchAllData() {
  Promise.all([fetchUserData(), fetchHydrationData(), fetchSleepData(), fetchActivityData()])
    .then(([userDataResult, hydrationDataResult, sleepDataResult, activityDataResult]) => {

      initializeUserData(userDataResult);

      const hydrationData = initializeHydrationData(hydrationDataResult);
      const sleepData = initializeSleepData(sleepDataResult);
      activityData = activityDataResult;

      const loggedInUser = getLoggedInUser();
      displayUserInfo(loggedInUser, userData);

      const date = "2023/07/01";
      displayHydroData(date, hydrationData.weekOfHydro, hydrationData.usersOunces, hydrationData.ouncesByDate);
      displaySleepData(
        sleepData.avgSleepHours,
        sleepData.avgSleepQuality,
        sleepData.sleepHoursByDay,
        sleepData.sleepQualityByDay,
        sleepData.hoursSleptThisWeek,
        sleepData.sleepQualityByWeek
      );

      const recentActivityData = getRecentActivityData(activityData, loggedInUser.id);
      displayActivityData(recentActivityData);
      //INVOKE NEW FUNCTION TO LOG ACTIVITY DATA PASSING IN OUR LOGGEDINUSER.FRIENDS
      logFriendsActivityData(loggedInUser.friends);
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
  // console.log("Initializing Hydration Data with:", data);
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
function getRecentActivityData(activityData, userId) {
  const userActivity = activityData.filter(activity => activity.userID === userId);
  const sortedActivity = userActivity.sort((a, b) => new Date(b.date) - new Date(a.date));
  return sortedActivity.slice(0, 7);
}

//FUNCTION TO LOG ACTIVITY DATA OF THE USER.FRIENDS
function logFriendsActivityData(friendIds) {
  friendIds.forEach(friendId => {
    const friendActivityData = activityData.filter(activity => activity.userID === friendId);
    console.log(`Activity data for friend ID ${friendId}:`, friendActivityData);
  });
}

fetchAllData();

export { getLoggedInUser };
