import { anneal } from "./annealing";
import { testGenerator } from "./testGenerator";
import { PlannerPreference } from "./types";
import {
  costReducer,
  createRandomPreference,
  mapGuestsToIndex,
  mapPreferencesToTables,
  seatsToJSON,
  shuffleArray,
  splitArray,
} from "./utilFunctions";

const fs = require("fs");

const seatingPlanner = (
  numTables: number,
  guestList: string[],
  preferences: PlannerPreference[]
): string => {
  const seatsPerTable = Math.ceil(guestList.length / numTables);
  const shuffledGuestList = shuffleArray(guestList);
  const randomTables = splitArray(shuffledGuestList, seatsPerTable);

  const mappedGuests = mapGuestsToIndex(randomTables);
  const preferenceScoresPerTable = mapPreferencesToTables(
    preferences,
    mappedGuests
  );

  const initialCost = costReducer(preferenceScoresPerTable);
  console.log("initialCost:", initialCost);

  const { currentCost: finalCost, currentGuests: optimizedGuests } = anneal(
    mappedGuests,
    preferences
  );

  console.log("finalCost:", finalCost);

  return seatsToJSON(optimizedGuests);
};

const { testPreferences, testGuestList, testNumTables } = testGenerator();

fs.writeFileSync(
  "output.json",
  seatingPlanner(testNumTables, testGuestList, testPreferences)
);

export default seatingPlanner;
