import { userSteps, avgSteps } from "./userDataFunctions.js";
import { hydroData, usersOunces, weekOfHydro, ouncesByDate} from "./hydrationDataFunctions.js";

//Mustcomment/ uncomment below querySelectors

var userCard = document.querySelector(".card1");
var welcomeUser = document.querySelector(".card-banner");
var widgetBox = document.querySelector(".card2");

export default function displayUserInfo(user) {
  userCard.innerHTML = `
  <section class ='user-card'> 
  <h3>User id is ${user.id}</h3>
  <h3>${user.name}'s daily step goal is ${user.dailyStepGoal} steps</h3>
  <h3>The average step goal is ${userSteps}</h3>
</section>
`;
  welcomeUser.innerText = `Welcome, ${user.name}`;
}

export function displayHydroData( weekOfHydro, usersOunces) {
  widgetBox.innerHTML = `<div class='widget'>
  <h3> 
  You have consumed  ounces of water today.
  </h3>
  <h3>${usersOunces}</h3>
  <h3>${weekOfHydro.map(day => day.numOunces)}</h3> 
  </div>`;
}
