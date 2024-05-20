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

function specificSleepQualityByDay(date, sleepArray, user) {
  const userSleepData = sleepArray.filter((entry) => entry.userID === user.id);
  const specificDate = userSleepData.find((day) => day.date === date);
  return specificDate ? specificDate.sleepQuality : 0;
}

function sleepHoursForWeek(user, sleepArray, startDate) {
  const userSleepData = sleepArray.filter((entry) => entry.userID === user.id);
  const start = new Date(startDate);
  const end = new Date(startDate);
  end.setDate(start.getDate() + 6);

  const sleepDataForWeek = userSleepData.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= start && entryDate <= end;
  });

  return sleepDataForWeek.map((entry) => ({
    date: entry.date,
    hoursSlept: entry.hoursSlept,
  }));
}

function sleepQualityForWeek(user, sleepArray, startDate) {
  const userSleepData = sleepArray.filter((entry) => entry.userID === user.id);
  const start = new Date(startDate);
  const end = new Date(startDate);
  end.setDate(start.getDate() + 6);

  const sleepDataForWeek = userSleepData.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= start && entryDate <= end;
  });

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    weekDates.push(date.toISOString().split("T")[0].replace(/-/g, "/"));
  }

  return weekDates.map((date) => {
    const dayData = sleepDataForWeek.find((entry) => entry.date === date);
    return {
      date,
      sleepQuality: dayData ? dayData.sleepQuality : 0,
    };
  });
}

function setSleepData(data) {
  newSleepData = data;
}

export {
  getAverageSleepHours,
  getAverageSleepQuality,
  specificSleepHoursByDay,
  specificSleepQualityByDay,
  sleepHoursForWeek,
  sleepQualityForWeek,
  setSleepData,
};
