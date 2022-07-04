/****************************************
 * INVENTORY & CATEGORY TYPES DECLARATION *
 ****************************************/

export type WeightUnit = 'GRAM' | 'KILOGRAM' | null
export type DimensionUnit = 'INCH' | 'CENTIMETER' | null
export type GenderOptions = 'm' | 'f' | 'u' | null
export type DynamicFieldsAray = Array<DynamicField>

interface DynamicField {
  attribute: string
  value: Array<String>
  input: string
}
interface Weight {
  unit: WeightUnit
  amount: number
}
interface Dimension {
  unit: DimensionUnit
  length: number
  width: number
  height: number
}
interface Branch {
  _id: number
  quantity: number
}
interface BranchObj {
  label: string
  value: string
}
export interface Options {
  id?: string | number
  label: string
  value?: string | number
  children?: Array<Object>
}
export interface TagsDropdown {
  options: Array<Options>
  value: null | Array<String>
}
export interface GeneralDropdown {
  options: Array<Options>
  value: Array<string> | null | Array<object>
}
export interface DimensionDropdown {
  options: Array<Options>
  value: DimensionUnit
}
export interface WeightDropdown {
  options: Array<Options>
  value: WeightUnit
}
export interface BranchDropdown {
  options: Options[]
  value: BranchObj[] | null
}
