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

  function specificSleepHoursByDay(date, sleepArray, user) {
    const userSleepData = sleepArray.filter((userP) => userP.userID === user.id);
    const specificDate = userSleepData.find((day) => day.date === date);
    return specificDate ? specificDate.hoursSlept : 0;
  }

export {
    getAverageSleepHours,
    getAverageSleepQuality,
    specificSleepHoursByDay
  };