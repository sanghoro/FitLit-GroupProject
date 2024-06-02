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

document.addEventListener('DOMContentLoaded', () => {
  const addSleepBttn = document.querySelector('.add-sleep-data');
  const sleepForm = document.querySelector('.sleep-form');

  addSleepBttn.addEventListener('click', () => {
    sleepForm.classList.remove('hidden');
    addSleepBttn.classList.add('hidden');
  });

  sleepForm.addEventListener('submit', submitSleepData);
  fetchAllData();
});

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
      displayActivityData(recentActivityData, loggedInUser);

      //INVOKE NEW FUNCTION TO LOG ACTIVITY DATA PASSING IN OUR LOGGEDINUSER.FRIENDS
      logFriendsActivityData(loggedInUser.friends);
      //INVOKING THE COMPARE STEPS FUNCTION TO RETURN THE USER AND LOGGED USER FRIENDS STEPS
      //BY PASSING IN THE LOGGED IN USER AND USER.FRIENDS AS ARGUMENTS
      const stepComparison = compareSteps(loggedInUser, loggedInUser.friends);
      logFriendsSteps(stepComparison);
      //INVOKE THE FUNCTION TO GET USER WITH MAX STEPS AND THEN CONSOLE LOG IT
      const userWithMaxSteps = findUserWithMaxSteps(stepComparison);
      console.log(`User with the most steps: ${userWithMaxSteps.name} (ID: ${userWithMaxSteps.userId}) with ${userWithMaxSteps.steps} steps`);   
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

//FUNCTION TO FIND AND LOG ACTIVITY DATA OF THE USER.FRIENDS
function logFriendsActivityData(friendIds) {
  friendIds.forEach(friendId => {
    const friendActivityData = activityData.filter(activity => activity.userID === friendId);
    console.log(`Activity data for friend ID ${friendId}:`, friendActivityData);
  });
}

// Combine the logged-in user's ID and friends' IDs into one array
// Map over all user IDs to get the total steps for each user
// Filter activity data to get activities only for the current user
// Sum up the number of steps for the current user
// Return an object containing the user ID, user name, and total steps
function compareSteps(loggedInUser, friendIds) {
  const allUserIds = [loggedInUser.id, ...friendIds];
  return allUserIds.map(userId => {
    const user = userData.find(user => user.id === userId);
    const recentActivityData = getRecentActivityData(activityData, userId);
    const totalSteps = recentActivityData.reduce((acc, activity) => acc + activity.numSteps, 0);
    return { userId, name: user.name, steps: totalSteps };
  });
}

// FUNCTION THAT FINDS THE USER WITH THE MOST STEPS
//It compares the steps of the user that is being iterated over in the stepsOfUserAndFriends array
//with the accumulator, if the user steps are greater, return the user, if the acc user has greater steps, return the acc.
function findUserWithMaxSteps(stepsOfUserAndFriends) {
  return stepsOfUserAndFriends.reduce((acc, user) => {
    if (user.steps > acc.steps) {
      return user;
    } else {
      return acc;
    }
  }, { userId: null, name: null, steps: 0 }); //This object is the initial value that will iterate over the array
}

// GENERIC CONSOLE LOG TO ENSURE THE FRIENDS STEP DATA RETREIVED FROM THE STEP COMPARISON FUNCTION IS ACCESSIBLE AND CORRECT
function logFriendsSteps(stepsOfUserAndFriends) {
  stepsOfUserAndFriends.forEach(user => {
    console.log(`User ${user.name} (ID: ${user.userId}) has ${user.steps} steps`);
  });
}

fetchAllData();

export { getLoggedInUser, compareSteps };