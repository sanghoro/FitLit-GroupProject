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

  function getAverageSleepQuality(user, sleepArray) {
    const userSleepData = sleepArray.filter((userP) => userP.userID === user.id);
    const totalQuality = userSleepData.reduce(
      (total, day) => total + day.sleepQuality,
      0
    );
    return totalQuality / userSleepData.length;
  }

export {
    getAverageSleepHours,
    getAverageSleepQuality
  };