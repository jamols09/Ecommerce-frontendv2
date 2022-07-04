/****************************************
 * CUSTOMER & EMPLOYEE TYPES DECLARATION *
 ****************************************/

export type Status = 'active' | 'verified'

export interface ImageData {
  name: string
  file: File | null
}
export interface People {
  active: boolean
  verified: boolean
  firstName: string
  middleName?: string
  lastName?: string
  birthdate: Date
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type StatusArray = Status[]
