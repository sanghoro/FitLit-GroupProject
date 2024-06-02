import { expect } from "chai";
import { sleepHoursForWeek, sleepQualityForWeek } from "../src/sleepDataFunctions.js";
import { usersArray, weekOfSleep } from "../src/data/mockData.js"; // Importing mock data

describe("sleepDataFunctions", () => {
  let user;
  let startDate;

  beforeEach(() => {
    user = usersArray[0];
    startDate = "2023/03/20";
  });

  describe("sleepHoursForWeek", () => {
    it("should return the hours slept each day over the course of a given week for a user", () => {
      const result = sleepHoursForWeek(user, weekOfSleep, startDate);
      expect(result).to.deep.equal([
        { date: "2023/03/20", hoursSlept: 9.6 },
        { date: "2023/03/21", hoursSlept: 7.8 },
        { date: "2023/03/22", hoursSlept: 8.2 },
        { date: "2023/03/23", hoursSlept: 6.5 },
        { date: "2023/03/24", hoursSlept: 7.0 },
        { date: "2023/03/25", hoursSlept: 8.0 },
        { date: "2023/03/26", hoursSlept: 8.2 }
      ]);
    });

    it("should return an empty array if the sleep data array is empty", () => {
      const result = sleepHoursForWeek(user, [], startDate);
      expect(result).to.deep.equal([]);
    });

    it("should return an empty array if the user exists but has no sleep data entries for the specified week", () => {
      const result = sleepHoursForWeek(user, weekOfSleep, "2023/02/01");
      expect(result).to.deep.equal([]);
    });
  });

  describe("sleepQualityForWeek", () => {
    it("should return the sleep quality each day over the course of a given week for a user", () => {
      const result = sleepQualityForWeek(user, weekOfSleep, startDate);
      expect(result).to.deep.equal([
        { date: "2023/03/20", sleepQuality: 4.3 },
        { date: "2023/03/21", sleepQuality: 3.8 },
        { date: "2023/03/22", sleepQuality: 4.1 },
        { date: "2023/03/23", sleepQuality: 2.5 },
        { date: "2023/03/24", sleepQuality: 3.0 },
        { date: "2023/03/25", sleepQuality: 4.0 },
        { date: "2023/03/26", sleepQuality: 4.1 }
      ]);
    });

    it("should return an array with zeros if the sleep data array is empty", () => {
      const result = sleepQualityForWeek(user, [], startDate);
      expect(result).to.deep.equal([
        { date: "2023/03/20", sleepQuality: 0 },
        { date: "2023/03/21", sleepQuality: 0 },
        { date: "2023/03/22", sleepQuality: 0 },
        { date: "2023/03/23", sleepQuality: 0 },
        { date: "2023/03/24", sleepQuality: 0 },
        { date: "2023/03/25", sleepQuality: 0 },
        { date: "2023/03/26", sleepQuality: 0 }
      ]);
    });

    it("should return an array with zeros if the user exists but has no sleep data entries for the specified week", () => {
      const result = sleepQualityForWeek(user, weekOfSleep, "2023/02/01");
      expect(result).to.deep.equal([
        { date: "2023/02/01", sleepQuality: 0 },
        { date: "2023/02/02", sleepQuality: 0 },
        { date: "2023/02/03", sleepQuality: 0 },
        { date: "2023/02/04", sleepQuality: 0 },
        { date: "2023/02/05", sleepQuality: 0 },
        { date: "2023/02/06", sleepQuality: 0 },
        { date: "2023/02/07", sleepQuality: 0 }
      ]);
    });
  });
});
