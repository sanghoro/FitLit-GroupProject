// Your fetch requests will live here

export function fetchUserData() {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.users;
    });
}

export function fetchHydrationData() {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/hydration")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.hydrationData;
    });
}

export function fetchSleepData() {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/sleep")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.sleepData;
    });
}

export function fetchActivityData() {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/activity")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.activityData;
    });
}

export default {
  fetchUserData,
  fetchHydrationData,
  fetchSleepData,
  fetchActivityData,
};
