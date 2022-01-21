import { createRandomPreference } from "./utilFunctions";
import { v4 } from "uuid";

export const testGenerator = (min = 80, max = 100) => {
  const testPreferences = [];
  const testGuestList = [];

  const randomLength = Math.floor(Math.random() * (max - min) + min);
  for (let i = 0; i < randomLength; i++) {
    testGuestList.push(v4());
  }

  const tableMin = min > 1 ? 2 : 1;
  const tableMax = Math.ceil(testGuestList.length / 2);
  const testNumTables = Math.floor(
    Math.random() * (tableMax - tableMin) + tableMin
  );

  for (let i = 0; i < testGuestList.length - 1; i++) {
    testPreferences.push(
      createRandomPreference(testGuestList[i], testGuestList[i + 1])
    );
  }

  return { testPreferences, testGuestList, testNumTables };
};
