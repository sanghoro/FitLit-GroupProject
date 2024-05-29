import Chart from 'chart.js/auto';
import {
  userSteps,
  setLoggedInUser,
  getLoggedInUser,
  findFriends,
} from "./userDataFunctions.js";
import { specificOuncesByDay } from "./hydrationDataFunctions.js";

// Query selectors
var userCard = document.querySelector(".card1");
var welcomeUser = document.querySelector(".card-banner");
var hydrationWidget = document.getElementById('hydration-widget');
var sleepWidget = document.getElementById('sleep-widget');
var isAllUserInfoDisplayed = false;

// Functions
export default function displayUserInfo(user, userData) {
  welcomeUser.innerHTML = `<h3> Welcome,<span> ${user.name.split(" ")[0]}!</span>`;
  checkIfDisplayed(user, userData);
}

function checkIfDisplayed(user, userData) {
  userCard.innerHTML = "";
  if (isAllUserInfoDisplayed) {
    const friends = findFriends(user, userData);
    const friendsNames = friends.map((friend) => friend.name).join(", ");
    userCard.innerHTML = `
      <section class='user-card'>
      <h2>User Profile</h2>
      <div>
        <h3><span>User id:</span> #${user.id}</h3> 
        <h3><span>Full name:</span> ${user.name}</h3>
        <h3><span>Email:</span> ${user.email}</h3>
        <h3><span>Address:</span> ${user.address}</h3>
        <h3><span>Friends:</span> ${friendsNames}</h3>
        <h3><span>Daily Step Goal:</span> ${user.dailyStepGoal}</h3>
        <h3><span>Stride Length:</span> ${user.strideLength}</h3>
        <button class='moreInfoBttn'>Hide</button>
      </div>
      </section>
    `;
  } else {
    userCard.innerHTML = `
      <section class='user-card'> 
        <div>
          <h3><span>${user.name.split(" ")[0]}'s</span> daily step goal is <span>${user.dailyStepGoal} </span>steps</h3>
          <h3>The <span>average</span> step goal is <span>${userSteps}</span></h3>
        </div>
        <button class='moreInfoBttn'>More User Info</button>
      </section>
    `;
  }
  var infoBttn = document.querySelector(".moreInfoBttn");
  infoBttn.addEventListener("click", () => toggleUserInfo(user, userData));
}

function toggleUserInfo(user, userData) {
  isAllUserInfoDisplayed = !isAllUserInfoDisplayed;
  checkIfDisplayed(user, userData);
}

export function displayHydroData(date, weekOfHydro, usersOunces, ouncesByDate) {
  hydrationWidget.innerHTML = `
    <div class='widget widget1'>
    <h2>Hydro Stats</h2>  
    <div>
      <h3>You drank <span>${ouncesByDate}oz</span> of water today.</h3>
      <h3><span>Average</span> ounces of water consumed: <span>${usersOunces}</span></h3>
      <h3><span>Water consumption</span> last week: <span>${weekOfHydro.map((day) => day.numOunces).join(", ")}</span></h3>
      <canvas class='graph' id="hydroChart"></canvas>
    </div>
    </div>`;

  const ctx = document.getElementById('hydroChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: weekOfHydro.map(day => day.date),
      datasets: [{
        label: 'Water Consumed (oz)',
        data: weekOfHydro.map(day => day.numOunces),
        borderColor: 'blue',
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Date' } },
        y: { title: { display: true, text: 'Ounces' } }
      }
    }
  });
}

export function displaySleepData(
  avgSleepHours,
  avgSleepQuality,
  sleepHoursByDay,
  sleepQualityByDay,
  hoursSleptThisWeek,
  sleepQualityByWeek
) {
  sleepWidget.innerHTML = `
  <div class='widget widget2'>
    <h2>Sleep Stats</h2>
    <div>
      <h3>You've slept <span>${Math.round(sleepHoursByDay)}</span> hours last night</h3>
      <h3>Last night's <span>sleep quality</span> was <span>${sleepQualityByDay}</span>/5</h3>
      <h3><span>Average</span> Hours of sleep per week ${Math.round(avgSleepHours)} </h3>
      <h3><span>Average</span> sleep quality: <span>${avgSleepQuality.toFixed(2)}</span> </h3>
      <h3><span>Hours slept</span> this week: <span>${hoursSleptThisWeek.map((day) => Math.round(day.hoursSlept)).join(", ")}</span> </h3>
      <h3><span>Sleep quality</span> this Week: <span>${sleepQualityByWeek.map((day) => day.sleepQuality).join(", ")}</span></h3>
    </div>
    <canvas id='sleepChart'></canvas>
  </div>`;

  const ctx = document.getElementById('sleepChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hoursSleptThisWeek.map(day => day.date),
      datasets: [{
        label: 'Hours Slept',
        data: hoursSleptThisWeek.map(day => day.hoursSlept),
        backgroundColor: 'green',
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Date' } },
        y: { title: { display: true, text: 'Hours' } }
      }
    }
  });
}


// export function displaySleepData(
//   avgSleepHours,
//   avgSleepQuality,
//   sleepHoursByDay,
//   sleepQualityByDay,
//   hoursSleptThisWeek,
//   sleepQualityByWeek
// ) {
//   widgetBox.innerHTML += `
//   <div class='widget widget2'>
//     <h2>Sleep Stats</h2>
//     <div>
//       <h3>You've slept <span>${Math.round(sleepHoursByDay)}</span> hours last night</h3>
//       <h3>Last night's <span>sleep quality</span> was <span>${sleepQualityByDay}</span>/5</h3>
//       <h3><span>Average</span> Hours of sleep per week ${Math.round(avgSleepHours)} </h3>
//       <h3><span>Average</span> sleep quality: <span>${avgSleepQuality.toFixed(2)}</span> </h3>
//       <canvas id='sleepQualityChart'></canvas>
//     </div>
//     <canvas id='sleepChart'></canvas>
//   </div>`;

//   const sleepHoursCtx = document.getElementById('sleepChart').getContext('2d');
//   new Chart(sleepHoursCtx, {
//     type: 'bar',
//     data: {
//       labels: hoursSleptThisWeek.map(day => day.date),
//       datasets: [{
//         label: 'Hours Slept',
//         data: hoursSleptThisWeek.map(day => day.hoursSlept),
//         backgroundColor: 'green',
//         fill: false
//       }]
//     },
//     options: {
//       responsive: true,
//       scales: {
//         x: { title: { display: true, text: 'Date' } },
//         y: { title: { display: true, text: 'Hours' } }
//       }
//     }
//   });
  // const sleepQualityCtx = document.getElementById('sleepQualityChart').getContext('2d');
  // new Chart(sleepQualityCtx, {
  //   type: 'line',
  //   data: {
  //     labels: sleepQualityByWeek.map(day => day.date),
  //     datasets: [{
  //       label: 'Sleep Quality',
  //       data: sleepQualityByWeek.map(day => day.sleepQuality),
  //       borderColor: 'blue',
  //       fill: false
  //     }]
  //   },
  //   options: {
  //     responsive: true,
  //     scales: {
  //       x: { title: { display: true, text: 'Date' } },
  //       y: { title: { display: true, text: 'Quality' } }
  //     }
  //   }
  // })
// }

