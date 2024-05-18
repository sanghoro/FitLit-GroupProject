import { expect } from "chai";
import { getAverageSleepHours } from "../src/sleepDataFunctions.js";

// Mock Data
const usersArray = [
  { id: 1, name: "Trystan Gorczany", dailyStepGoal: 10000 },
  { id: 2, name: "Jane Doe", dailyStepGoal: 8000 },
  { id: 3, name: "John Smith", dailyStepGoal: 6000 },
];

const sleepData = [
  { userID: 1, date: "2023/03/24", hoursSlept: 9.6, sleepQuality: 4.3 },
  { userID: 1, date: "2023/03/25", hoursSlept: 7.8, sleepQuality: 3.8 },
  { userID: 1, date: "2023/03/26", hoursSlept: 8.2, sleepQuality: 4.1 },
  { userID: 2, date: "2023/03/24", hoursSlept: 6.5, sleepQuality: 2.5 },
  { userID: 2, date: "2023/03/25", hoursSlept: 7.0, sleepQuality: 3.0 },
  { userID: 3, date: "2023/03/24", hoursSlept: 8.0, sleepQuality: 4.0 },
];

describe("Sleep Data Functions", () => {
  describe("getAverageSleepHours", () => {
    // Normal return
    it("should return the average hours slept per day for a user", () => {
      const user = usersArray[0];
      const result = getAverageSleepHours(user, sleepData);
      expect(result).to.equal((9.6 + 7.8 + 8.2) / 3);
    });

    // No sleep data for the user
    it("should return NaN if there is no sleep data for the user", () => {
      const user = { id: 4, name: "Literally Who?", dailyStepGoal: 5000 };
      const result = getAverageSleepHours(user, sleepData);
      expect(result).to.be.NaN;
    });

    // No sleep data provided at all
    it("should return NaN if the sleep data array is empty", () => {
      const user = usersArray[0];
      const result = getAverageSleepHours(user, []);
      expect(result).to.be.NaN;
    });

    // User exists but has no sleep data
    it("should return NaN if the user exists but has no sleep data entries", () => {
      const user = usersArray[0];
      const emptySleepData = sleepData.filter(entry => entry.userID !== user.id);
      const result = getAverageSleepHours(user, emptySleepData);
      expect(result).to.be.NaN;
    });
  });
});