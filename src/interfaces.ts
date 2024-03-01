export interface CabinType {
    created_at?: string
    description?: string
    discount?: number
    id?: number
    image?: string | File
    maxCapacity?: number
    name?: string
    regularPrice?: number
    cabins: Cabins
    guests: Guests
}

export interface SettingsType {
    created_at?: string
    id?: number
    minBookingLength?: number
    maxBookingLength?: number
    maxGuestsPerBooking?: number
    breakfastPrice?: number
}

export interface Settings {
    isLoading: boolean
    settings: SettingsRows
}

export interface SettingsRows {
    maxBookingLength: number
    minBookingLength: number
    maxGuestsPerBooking: number
    breakfastPrice: number
}

export interface BookingType {
    id?: number
    created_at?: string
    startDate?: string
    endDate?: string
    numNights?: number
    numGuests?: number
    cabinPrice?: number
    extrasPrice?: number
    totalPrice?: number
    status?: string
    hasBreakfast?: boolean
    isPaid?: true
    observations?: string
    cabinId: number
    guestId: number
    cabins: Cabins
    guests: Guests
}

export interface BookingResponse {
    data: BookingKa[]
    count: number
}

export interface BookingKa {
    id?: number
    created_at?: string
    startDate?: string
    endDate?: string
    numNights?: number
    numGuests?: number
    status?: string
    totalPrice?: number
    cabinPrice?: number
    extrasPrice?: number
    hasBreakfast?: boolean
    observations?: 'string'
    isPaid?: boolean
    cabins: Cabins
    guests: Guests
}

interface Cabins {
    name?: string
}

interface Guests {
    email?: string
    fullName?: string
    country?: string
    countryFlag?: string
    nationalID?: string
}
