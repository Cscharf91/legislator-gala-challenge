type Preference = "avoid" | "pair";

export interface PlannerPreference {
  preference: Preference;
  guests: [string, string];
}

export interface MappedGuests {
  [guest: string]: number;
}
