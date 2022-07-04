/****************************
 * BRANCH TYPES DECLARATION *
 ****************************/

interface GeoLocation {
  longitude: number | null
  latitude: number | null
}

interface Address {
  country: string
  regionState: string
  city: string
  addressLine1: string
  addressLine2?: string | null
  postal: number | null
  geolocation: GeoLocation
}

interface Contact {
  telephone: string | null
  mobile: string | null
}

export interface Branch {
  name: string
  code: string
  address: Address
  contact: Contact
}
