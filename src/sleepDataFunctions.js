// global variables
let newSleepData = [];

function getAverageSleepHours(user, sleepArray) {
    const userSleepData = sleepArray.filter((userP) => userP.userID === user.id);
    const totalHours = userSleepData.reduce(
      (total, day) => total + day.hoursSlept,
      0
    );
    return totalHours / userSleepData.length;
  }


export {
    getAverageSleepHours,
  };