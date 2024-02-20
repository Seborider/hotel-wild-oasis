export interface CabinType {
  created_at?: string;
  description?: string;
  discount?: number;
  id?: number;
  image?: string | File;
  maxCapacity?: number;
  name?: string;
  regularPrice?: number;
}

export interface SettingsType {
  created_at?: string;
  id?: number;
  minBookingLength?: number;
  maxBookingLength?: number;
  maxGuestsPerBooking?: number;
  breakfastPrice?: number;
}

export interface Settings {
  isLoading: boolean;
  settings: SettingsRows;
}

export interface SettingsRows {
  maxBookingLength: number;
  minBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}
