// //imports
import { fetchUserData, fetchHydrationData, fetchSleepData, fetchActivityData } from "./apiCalls.js";
import "./css/styles.css";
// import displayUserInfo, { displayHydroData } from "./domUpdates.js";
// import hydration from "./data/hydration.js";
// import {
//   userSteps,
//   getRandomIndex,
//   getUserDataById,
//   usersArray,
// } from "./userDataFunctions.js";
// import { hydroData, usersOunces, weekOfHydro, weekOfHydroData, ouncesByDate} from "./hydrationDataFunctions.js";

// //Global
// // var hydroData = hydration.hydrationData;
// var randomUser = getUserDataById(getRandomIndex(usersArray), usersArray);

// // function invokations
// // weekOfHydroData(randomUser, hydroData);
// // getHydrationData(randomUser, hydroData);
// // specificOuncesByDay("2023/06/12", hydroData);



// //must comment/uncomment below function and Queryselectors in domUpdates.js when wanting to run test in terminal
// displayUserInfo(randomUser);
// console.log('::::,', weekOfHydro)
// displayHydroData(weekOfHydro,usersOunces)

// export { hydroData, userSteps };

//TEST FETCHALL

let userData, hydroData, sleepData, activityData;

function fetchAllData() {
    // Fetch all the data
    const userDataPromise = fetchUserData();
    const hydroDataPromise = fetchHydrationData();
    const sleepDataPromise = fetchSleepData();
    const activityDataPromise = fetchActivityData();

    // Wait for all promises to resolve
    return Promise.all([userDataPromise, hydroDataPromise, sleepDataPromise, activityDataPromise])
        .then((data) => {
          console.log('Data fetched successfully:', data);
            userData = data[0];
            hydroData = data[1];
            sleepData = data[2];
            activityData = data[3];
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            throw error; // Propagate the error so it can be handled by the caller
        });
}

function getUserData() {
  console.log('Fetching user data:', userData);
  return userData;
}

function getHydroData() {
  console.log('Fetching hydration data:', hydroData);
  return hydroData;
}

function getSleepData() {
  console.log('Fetching sleep data:', sleepData);
  return sleepData;
}

function getActivityData() {
  console.log('Fetching activity data:', activityData);
  return activityData;
}

fetchAllData().then(() => {
  console.log('User Data:', getUserData());
  console.log('Hydration Data:', getHydroData());
  console.log('Sleep Data:', getSleepData());
  console.log('Activity Data:', getActivityData());
});