// imports
import { fetchUserData } from "./apiCalls.js";

// global variables
let newUserData = [];
let userSteps = 0;
let randomUser = {};
let loggedInUser = {};

//functions
function initializeUserData() {
  fetchUserData().then((data) => {
    newUserData = data;
    userSteps = avgSteps(newUserData);
    randomUser = getUserDataById(getRandomIndex(newUserData), newUserData);
    loggedInUser = randomUser;
  });
}
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
function getUserDataById(userID, userDataArray) {
  return userDataArray.find((user) => user.id === userID);
}
function avgSteps(userDataArray) {
  return userDataArray.reduce((acc, user) => {
    return acc + user.dailyStepGoal / userDataArray.length;
  }, 0);
}
function setLoggedInUser(userID) {
  loggedInUser = getUserDataById(userID, newUserData);
}
function getLoggedInUser() {
  return loggedInUser;
}

initializeUserData();

// exports
export {
  getRandomIndex,
  getUserDataById,
  randomUser,
  userSteps,
  avgSteps,
  setLoggedInUser,
  getLoggedInUser,
  loggedInUser,
};
