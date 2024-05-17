import { userSteps, avgSteps, randomUser } from "./userDataFunctions.js";
import {
  hydroData,
  usersOunces,
  weekOfHydro,
  ouncesByDate,
  specificOuncesByDay,
} from "./hydrationDataFunctions.js";

// Must comment/uncomment below querySelectors

var userCard = document.querySelector(".card1");
var welcomeUser = document.querySelector(".card-banner");
var widgetBox = document.querySelector(".card2");

displayUserInfo(randomUser);
displayHydroData("2023/03/24", hydroData, randomUser);

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

export function displayHydroData(date, hydroData, user) {
  const ouncesByDate = specificOuncesByDay(date, hydroData, user);
  widgetBox.innerHTML = `
  <div class='widget'>
    <h3>You have consumed ${ouncesByDate} ounces of water today.</h3>
    <h3>Average ounces consumed: ${usersOunces}</h3>
    <h3>Past week's water consumption: ${weekOfHydro.map((day) => day.numOunces).join(", ")}</h3>
  </div>`;
}
