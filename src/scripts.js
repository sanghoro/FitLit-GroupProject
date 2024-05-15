//imports

import './css/styles.css';
import displayUserInfo from './domUpdates.js'
import hydration from './data/hydration.js';
import { userSteps, getRandomIndex, getUserDataByID, usersArray } from './userDataFunctions.js';
import { getHydrationData, weekOfHydroData, specificOuncesByDay } from './hydrationDataFunctions.js';


//Global 
var hydroData = hydration.hydrationData
var randomUser = getUserDataByID(getRandomIndex(usersArray), usersArray)

// function invokations 
console.log('Weekof::',weekOfHydroData(randomUser, hydroData))
console.log('hydroData::::', getHydrationData(randomUser, hydroData))
console.log(':::::', specificOuncesByDay('2023/06/12', hydroData))
// displayUserInfo(randomUser)

export { 
    hydroData,
    userSteps, 
   
}