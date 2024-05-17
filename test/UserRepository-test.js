import { expect } from "chai";
// import { getUserDataById } from './src/scripts.js'
// const { getUserDataByID, avgSteps, getHydrationData } = require('../src/scripts.js');

import {
  usersArray,
  getUserDataById,
  avgSteps,
} from "../src/userDataFunctions.js";

import {
  getHydrationData,
  hydroData,
  specificOuncesByDay,
  weekOfHydroData,
} from "../src/hydrationDataFunctions.js";

//userDataFunctions-testing
describe("User Repository", () => {
  it("should run tests", function () {
    expect(true).to.equal(true);
  });
});

describe("User Data", () => {
  it("should return user data based on ID", function () {
    const user1 = getUserDataById(1, usersArray);
    expect(user1.name).to.equal("Trystan Gorczany");
  });
});

describe("Get average steps", () => {
  it("should return average steps goal", function () {
    const userSteps = avgSteps(usersArray);
    expect(userSteps).to.equal(6780);
  });
});

//hydrationDataFunctions-testing
describe("getHydrationData", function () {
  const hydrationData = [
    { userID: 1, date: "2023/03/24", numOunces: 28 },
    { userID: 2, date: "2023/03/24", numOunces: 35 },
    { userID: 3, date: "2023/03/24", numOunces: 95 },
    { userID: 4, date: "2023/03/24", numOunces: 74 },
    { userID: 5, date: "2023/03/24", numOunces: 47 },
  ];

  it("should return the hydration data for user", function () {
    const user = { id: 1 };
    const result = getHydrationData(user, hydrationData);
    expect(result).to.equal(28);
  });

  it("should return the average hydration data for user with multiple entries", function () {
    const extendedHydrationData = [
      ...hydrationData,
      { userID: 1, date: "2023/03/25", numOunces: 50 },
      { userID: 1, date: "2023/03/26", numOunces: 21 },
    ];

    const user = { id: 1 };
    const result = getHydrationData(user, extendedHydrationData);
    expect(result).to.equal((28 + 50 + 21) / 3);
  });
});

describe("specific oz", function () {
  it("should return the ounces of water drank on a specific date", function () {
    const user = { id: 1 };
    const result = specificOuncesByDay("2023/03/24", hydroData, user);
    expect(result).to.equal(28);
  });
});
it("should return 0 if no data is found for the specific date", function () {
  const user = { id: 1 };
  const date = "1111/11/11";
  const result = specificOuncesByDay(date, hydroData, user);
  expect(result).to.equal(0);
});

it("should return week of data", function () {
  const user = { id: 1 };
  const expectedWeekData = [
    { userID: 1, date: "2023/06/25", numOunces: 50 },
    { userID: 1, date: "2023/06/26", numOunces: 41 },
    { userID: 1, date: "2023/06/27", numOunces: 95 },
    { userID: 1, date: "2023/06/28", numOunces: 25 },
    { userID: 1, date: "2023/06/29", numOunces: 78 },
    { userID: 1, date: "2023/06/30", numOunces: 62 },
    { userID: 1, date: "2023/07/01", numOunces: 91 },
  ];
  const result = weekOfHydroData(user, hydroData);
  expect(result).to.deep.equal(expectedWeekData);
});
