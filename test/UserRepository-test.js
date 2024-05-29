import { expect } from "chai";
import {usersArray, hydrationData} from "../src/data/mockData.js";
import { getUserDataById, avgSteps } from "../src/userDataFunctions.js";
import {
  getHydrationData,
  specificOuncesByDay,
  weekOfHydroData,
} from "../src/hydrationDataFunctions.js";

describe("User Repository", () => {
  it("should run tests", function () {
    expect(true).to.equal(true);
  });
});

describe("User Data", () => {
  let user;

  beforeEach(() => {
    user = usersArray[0];
  });

  it("should return user data based on ID", function () {
    const user1 = getUserDataById(user.id, usersArray);
    expect(user1.name).to.equal("Trystan Gorczany");
  });
});

describe("Get average steps", () => {
  let users;

  beforeEach(() => {
    users = usersArray;
  });

  it("should return average steps goal", function () {
    const userSteps = avgSteps(users);
    expect(userSteps).to.equal((10000 + 8000 + 6000) / 3);
  });
});

describe("getHydrationData", function () {
  let user;
  let extendedHydrationData;

  beforeEach(() => {
    user = { id: 1 };
    extendedHydrationData = [
      ...hydrationData,
      { userID: 1, date: "2023/03/25", numOunces: 50 },
      { userID: 1, date: "2023/03/26", numOunces: 21 },
    ];
  });

  it("should return the hydration data for user", function () {
    const result = getHydrationData(user, hydrationData);
    expect(result).to.equal(28);
  });

  it("should return the average hydration data for user with multiple entries", function () {
    const result = getHydrationData(user, extendedHydrationData);
    expect(result).to.equal((28 + 50 + 21) / 3);
  });
});

describe("specific oz", function () {
  let user;
  let date;

  beforeEach(() => {
    user = { id: 1 };
    date = "2023/03/24";
  });

  it("should return the ounces of water drank on a specific date", function () {
    const result = specificOuncesByDay(date, hydrationData, user);
    expect(result).to.equal(28);
  });

  it("should return 0 if no data is found for the specific date", function () {
    const nonExistentDate = "1111/11/11";
    const result = specificOuncesByDay(nonExistentDate, hydrationData, user);
    expect(result).to.equal(0);
  });

  it("should return week of data", function () {
    const mockHydrationData = [
      { userID: 1, date: "2023/06/25", numOunces: 50 },
      { userID: 1, date: "2023/06/26", numOunces: 41 },
      { userID: 1, date: "2023/06/27", numOunces: 95 },
      { userID: 1, date: "2023/06/28", numOunces: 25 },
      { userID: 1, date: "2023/06/29", numOunces: 78 },
      { userID: 1, date: "2023/06/30", numOunces: 62 },
      { userID: 1, date: "2023/07/01", numOunces: 91 },
    ];
    const result = weekOfHydroData(user, mockHydrationData);
    expect(result).to.deep.equal(mockHydrationData.reverse());
  });
});
