// global variables
let newUserData = [];
let userSteps = 0;
let randomUser = {};
let loggedInUser = {};

// functions
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

function setUserData(data) {
  newUserData = data;
}

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
  setUserData,
};
