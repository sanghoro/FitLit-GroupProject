import { getLoggedInUser } from "./userDataFunctions";


export function fetchData(endpoint) {
  return fetch(`https://fitlit-api.herokuapp.com/api/v1/${endpoint}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
    
      
      return data
    });
}

export function fetchUserData() {
  return fetchData('users').then(data =>  data.users)
}

export function fetchHydrationData() {
  return fetchData('hydration').then(hydrationData => hydrationData.hydrationData)
}

export function fetchSleepData() {
  return fetchData('sleep').then(data => data.sleepData)
}

export function fetchActivityData() {
  return fetchData('activity').then(data => data.activityData)
}

//POST
export function addSleepData(newSleepObj) {
 return fetch('http://localhost:3001/api/v1/sleep',{
    method:'POST',
    body: JSON.stringify(newSleepObj),
    headers: {
     'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => displayAddedSleepData(data))
}

const displayAddedSleepData = sleepData => {
  
  var newSleepDisplay = document.querySelector('.returned-data')
  newSleepDisplay.innerHTML = `
    <h3> New USER Input Data </h3>
    <p>Id: ${sleepData.userID}<p>
    <p>Date:${sleepData.date}<p>
    <p>Hours slept: ${sleepData.hoursSlept} </p>
    <p> Sleep Quality: ${sleepData.sleepQuality} </p>
  `;
};




export function submitSleepData(e) {
  e.preventDefault();
  // const addSleepBttn = document.querySelector('.add-sleep-data');
  const sleepForm = document.querySelector('.sleep-form');
  // addSleepBttn.classList.remove('hidden')
  sleepForm.classList.add('hidden')
  const loggedInUser = getLoggedInUser();
  const formElement = e.target;
  const formData = new FormData(formElement);
  const sleepLog = {
    userID: loggedInUser.id,
    date: formData.get('date-id'),
    hoursSlept: parseInt(formData.get('hr-slept-id')),
    sleepQuality: parseInt(formData.get('sleep-qlty-id'))
  };

  if (sleepLog.hoursSlept <= 0 || sleepLog.hoursSlept > 24) {
    alert("Invalid number of hours slept. It should be between 1 and 24.");
    return;
  }

  if (sleepLog.sleepQuality <= 0 || sleepLog.sleepQuality > 5) {
    alert("Invalid sleep quality. It should be between 1 and 5.");
    return;
  }

  addSleepData(sleepLog).then(() => {
  
    return fetchSleepData();  
  })
  .then(updatedSleepData => {
    console.log('Updated Sleep Data:', updatedSleepData);  
  })
  .catch(error => {
    console.error('Error fetching updated sleep data:', error);
  });
}