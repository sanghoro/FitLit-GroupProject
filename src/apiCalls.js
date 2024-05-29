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