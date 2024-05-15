//imports
import users from "./data/users";
import displayUserInfo from './domUpdates.js'


//global


var usersArray = users.users
var userSteps = avgSteps(usersArray)
var randomUser = getUserDataByID(getRandomIndex(usersArray), usersArray)

//functions
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function getUserDataByID(userID, usersArray) {
    const userData = usersArray.find((user) => user.id === userID)
    return userData
}

function avgSteps(userArray) {
    const userSteps = userArray.reduce((acc, user) => {
        acc += user.dailyStepGoal / userArray.length
        return acc
    }, 0)
    return userSteps
}






//exports
export { 
    getRandomIndex,
    getUserDataByID,
    randomUser,
    userSteps, 
    avgSteps,
    usersArray
}