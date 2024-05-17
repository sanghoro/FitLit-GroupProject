//imports
import users from "./data/users";
// import displayUserInfo from './domUpdates.js' <<< causing issue

//global

var usersArray = users.users;
var userSteps = avgSteps(usersArray);
var randomUser = getUserDataById(getRandomIndex(usersArray), usersArray);
var loggedInUser = randomUser;

//functions
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function getUserDataById(userID, usersArray) {
  var userData = usersArray.find((user) => user.id === userID);
  return userData;
}

function avgSteps(userArray) {
  const userSteps = userArray.reduce((acc, user) => {
    acc += user.dailyStepGoal / userArray.length;
    return acc;
  }, 0);
  return userSteps;
}

function setLoggedInUser(userID) {
  loggedInUser = getUserDataById(userID, usersArray);
}

function getLoggedInUser() {
  return loggedInUser;
}

//exports
export {
  getRandomIndex,
  getUserDataById,
  randomUser,
  userSteps,
  avgSteps,
  usersArray,
  setLoggedInUser,
  getLoggedInUser,
  loggedInUser,
};
