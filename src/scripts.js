//imports
import users from './data/users';
import './css/styles.css';
import displayUserInfo from './domUpdates.js'
import hydration from './data/hydration.js';

//Global 
var hydroData = hydration.hydrationData
var usersArray = users.users
var randomUser = getUserDataByID(getRandomIndex(usersArray), usersArray)
var userSteps = avgSteps(usersArray)


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

function getHydrationData(user, hydroData){
    var userHydroData = hydroData.filter((userP) => userP.userID === user.id)
    // console.log('hydroData1:', userHydroData)
    
    const hydroAvg = userHydroData.reduce((acc, ounces)=> {
        acc += ounces.numOunces / userHydroData.length
        return acc
    }, 0)
    
    // console.log('hydrodata:::', hydroAvg)
    return hydroAvg
}

function specificOuncesByDay(date, hydroData){
    const specificDate = hydroData.filter((day) => day.date === date)   
    const randomUserOunces = specificDate.find(user => user.userID === randomUser.id)

    // console.log('date:::', specificDate)
    // console.log('randomUser:::', randomUserOunces)
    // console.log('userOunce', randomUserOunces.numOunces)
    return randomUserOunces.numOunces
}

// function weekOfHydroData(hydroData) {
//     const weekData = []
   
//     console.log('hydroData2::', hydroData)
//     for(var i = 0; i < 7 && i < hydroData.length; i++) {
//         weekData.push(hydroData[i].numOunces)
//     }
//     console.log('week:::',weekData)
//     return weekData
// }
//the push isnt working 

function weekOfHydroData(user, hydroData) {
    const userHydroData = hydroData.filter(userP => userP.userID === user.id);
    console.log('adams log::',userHydroData)

    const lastIndex = userHydroData.length - 1;
    const weekData = [];

    const startIndex = lastIndex < 6 ? 0 : lastIndex - 6;

    for (let i = startIndex; i <= lastIndex; i++) {
        weekData.push(userHydroData[i]);
    }
    console.log('line78', weekData)
    return weekData;
}

weekOfHydroData(randomUser, hydroData)
getHydrationData(randomUser, hydroData)
specificOuncesByDay('2023/06/12', hydroData)

displayUserInfo(randomUser)

export { 
    userSteps, 
    getHydrationData
}