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

export function postSleepData(newSleepObj) {
  fetch('http://localhost:3001/api/v1/sleep',{
    method:'POST',
    body: JSON.stringify(newSleepObj), // remember how HTTP can only send and receive strings, just like localStorage?
    headers: {
     'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
}

export function submitSleepData(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const sleepLog = {
    userID: parseInt(formData.get('#user-input-id')),
    date: formData.get('#date-id'),
    hoursSlept: parseInt(formData.get('#hr-slept-id')),
    sleepQuality: parseInt(formData.get('#sleep-qlty-id'))
};
postSleepData(sleepLog)
}
