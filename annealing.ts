import { MappedGuests, PlannerPreference } from "./types";
import {
  mapPreferencesToTables,
  pickRandomName,
  randomElementFromArray,
  costReducer,
} from "./utilFunctions";
import { unset } from "lodash";

export const anneal = (
  guests: MappedGuests[],
  preferences: PlannerPreference[],
  iterations = 100
) => {
  let currentGuests = [...guests];
  let currentCost = getCost(currentGuests, preferences);
  let temperature = 1;
  const minTemperature = 0.00001;
  const alpha = 0.9;

  while (temperature > minTemperature) {
    for (let i = 0; i < iterations; i++) {
      const newGuests = findNeighbor(currentGuests);
      const newCost = getCost(newGuests, preferences);
      const acceptanceProb = getAcceptanceProbability(
        currentCost,
        newCost,
        temperature
      );

      if (acceptanceProb > Math.random()) {
        currentCost = newCost;
        currentGuests = newGuests;
      }
    }
    temperature *= alpha;
  }

  return { currentCost, currentGuests };
};

const getCost = (
  currentGuests: MappedGuests[],
  allPreferences: PlannerPreference[]
): number => {
  const preferenceCostPerTable = mapPreferencesToTables(
    allPreferences,
    currentGuests
  );
  const score = costReducer(preferenceCostPerTable);
  return score;
};

const findNeighbor = (currentGuests: MappedGuests[]): MappedGuests[] => {
  const newGuests = [...currentGuests];
  const { randomEl: randomTable1, randomIndex: randomIndex1 } =
    randomElementFromArray(currentGuests);
  const { randomEl: randomTable2, randomIndex: randomIndex2 } =
    randomElementFromArray(
      currentGuests.filter((table) => table !== randomTable1)
    );
  const randomGuest1 = pickRandomName(randomTable1);
  const randomGuest2 = pickRandomName(randomTable2);

  const temp1 = randomTable1[randomGuest1];
  const temp2 = randomTable2[randomGuest2];

  const newTable1 = { ...randomTable1 };
  const newTable2 = { ...randomTable2 };

  newTable2[randomGuest1] = temp1;
  newTable1[randomGuest2] = temp2;

  unset(newTable1, randomGuest1);
  unset(newTable2, randomGuest2);
  // delete newTable1[randomGuest1];
  // delete newTable2[randomGuest2];

  newGuests[randomIndex1] = newTable1;
  newGuests[randomIndex2] = newTable2;

  return newGuests.map((table, index) => {
    if (index === randomIndex1) {
      return newTable1;
    } else if (index === randomIndex2) {
      return newTable2;
    }
    return table;
  });
};

const getAcceptanceProbability = (
  oldCost: number,
  newCost: number,
  temperature: number
) => (newCost < oldCost ? 1 : (oldCost - newCost) / temperature);
