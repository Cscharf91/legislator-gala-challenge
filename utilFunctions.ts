import { MappedGuests, PlannerPreference } from "./types";

export const createRandomPreference = (
  guestA: string,
  guestB: string
): PlannerPreference => ({
  preference: Math.random() * 1 > 0.5 ? "avoid" : "pair",
  guests: [guestA, guestB],
});

export const mapGuestsToIndex = (tables: string[][]): MappedGuests[] => {
  const mappedTables = [];
  for (const table of tables) {
    const mappedGuests = {};

    table.forEach((guest, index) => {
      mappedGuests[guest] = index;
    });
    mappedTables.push(mappedGuests);
  }

  return mappedTables;
};

// Maps prefs into and array of each table, containing arrays of scores.
export const mapPreferencesToTables = (
  preferences: PlannerPreference[],
  mappedTables: MappedGuests[]
): number[][] => {
  const allPreferences = [];
  mappedTables.forEach((table) => {
    const tablePreferences = [];
    for (const { guests, preference } of preferences) {
      if (table[guests[0]] && table[guests[1]]) {
        tablePreferences.push(preference === "avoid" ? 1 : -1);
      }
    }
    allPreferences.push(tablePreferences);
  });
  return allPreferences;
};

export const shuffleArray = <Type>(array: Type[]): Type[] => {
  const copiedArr = [...array];
  for (let i = copiedArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedArr[i], copiedArr[j]] = [copiedArr[j], copiedArr[i]];
  }
  return copiedArr;
};

export const splitArray = <Type>(array: Type[], chunkSize: number): Type[][] =>
  array.reduce((acc, curr, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(curr);
    return acc;
  }, []);

export const costReducer = (preferenceCostPerTable: number[][]): number =>
  preferenceCostPerTable.reduce((acc, tableScores) => {
    const tableScore = tableScores.reduce((acc2, score) => {
      return (acc2 += score);
    }, 0);
    return (acc += tableScore);
  }, 0);

export const seatsToJSON = (guests: MappedGuests[]): string => {
  const output = {};
  for (const [tableIndex, guestDict] of Object.entries(guests)) {
    output[`table_${+tableIndex + 1}`] = Object.keys(guestDict);
  }
  return JSON.stringify(output);
};

export const randomElementFromArray = <Type>(
  arr: Type[]
): { randomEl: Type; randomIndex: number } => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return { randomEl: arr[randomIndex], randomIndex };
};

export const pickRandomName = (guests: MappedGuests): string => {
  let result: string;
  while (!result) {
    for (const name in guests) {
      if (Math.random() < 0.1) {
        result = name;
      }
    }
  }
  return result;
};
