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
  <p>Id: ${sleepData.userID}<p>
  <p>Date:${sleepData.date}<p>
  <p>Hours Slept${sleepData.hoursSlept}<p>
  <p>SleepQuality:${sleepData.sleepQuality}<p>
  `
};


export function submitSleepData(e) {
  e.preventDefault();
  const formElement = e.target
  const formData = new FormData(formElement);
  const sleepLog = {
    userID: parseInt(formData.get('user-input-id')),
    date: formData.get('date-id'),
    hoursSlept: parseInt(formData.get('hr-slept-id')),
    sleepQuality: parseInt(formData.get('sleep-qlty-id'))
  };
  console.log('Sleep Log Data:', sleepLog);
  addSleepData(sleepLog).then(() => {
    console.log('Data should now be updated.');
    return fetchSleepData();  
  })
  .then(updatedSleepData => {
    console.log('Updated Sleep Data:', updatedSleepData);  
  })
  .catch(error => {
    console.error('Error fetching updated sleep data:', error);
  });
}
