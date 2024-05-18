// imports
import {
  userSteps,
  setLoggedInUser,
  getLoggedInUser,
} from "./userDataFunctions.js";

import { specificOuncesByDay } from "./hydrationDataFunctions.js";

// Query selectors
var userCard = document.querySelector(".card1");
var welcomeUser = document.querySelector(".card-banner");
var widgetBox = document.querySelector(".card2");

// Functions
export default function displayUserInfo(user) {
  userCard.innerHTML = `
    <section class='user-card'> 
      <h3>User id is ${user.id}</h3>
      <h3>${user.name}'s daily step goal is ${user.dailyStepGoal} steps</h3>
      <h3>The average step goal is ${userSteps}</h3>
    </section>
  `;
  welcomeUser.innerText = `Welcome, ${user.name}`;
}
export function displayHydroData(date, weekOfHydro, usersOunces, ouncesByDate) {
  widgetBox.innerHTML = `
    <div class='widget'>
      <h3>You have consumed ${ouncesByDate} ounces of water today.</h3>
      <h3>Average ounces consumed: ${usersOunces}</h3>
      <h3>Past week's water consumption: (From today to past 7 days) ${weekOfHydro.map((day) => day.numOunces).join(", ")}</h3>
    </div>`;
}

setLoggedInUser();
