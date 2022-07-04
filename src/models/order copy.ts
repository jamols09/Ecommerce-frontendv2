/***************************
 * ORDER TYPES DECLARATION *
 ***************************/

export type OrderTabs = 'customer' | 'item' | 'computation'

interface Options {
  id?: string | number
  label: string
  value?: string | number
}
interface ProductOrdered {
  value: string
  label: string
}
interface BranchOrdered {
  id: string
  name: string
}
export interface CustomerInfo {
  firstName: string
  middleName?: string
  lastName?: string
  country: string
  stateRegion: string
  province: string
  city: string
  barangay: string
  line1: string
  line2: string
  mobile: string
  telephone: string
  postal: number | null
}
export interface OrderItems {
  value: string
  label: string
  quantity: number
  bvalue: string
  blabel: string
}
export interface ProductDropdown {
  options: Array<Options>
  value: null | ProductOrdered
}
export interface BranchItems {
  value: string
  label: string
}
export type OrderItemsArray = OrderItems[]
export type BranchItemsArray = BranchItems[]
