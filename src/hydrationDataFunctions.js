import hydration from "./data/hydration";

import { randomUser } from "./userDataFunctions";

var hydroData = hydration.hydrationData
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
    return randomUserOunces.numOunces
}

function weekOfHydroData(user, hydroData) {
    const userHydroData = hydroData.filter(userP => userP.userID === user.id);

    const lastIndex = userHydroData.length - 1;
    const weekData = [];

    const startIndex = lastIndex < 6 ? 0 : lastIndex - 6;

    for (let i = startIndex; i <= lastIndex; i++) {
        weekData.push(userHydroData[i]);
    }

    return weekData;
}

export { 
    hydroData,
    getHydrationData,
    weekOfHydroData,
    specificOuncesByDay
}