export interface IHeader {
  name: string
}

export interface IData {
  id: number
  is_discountable?: number
  name: string
  sku?: string
  username?: string
  first_name?: string
  middle_name?: string | null
  last_name?: string | null
  birthdate?: string
  thumbnail?: string | null
  is_active?: number
  email?: string
  account_type?: string
  email_verified_at?: string
  created_at?: string
  code?: string | null
  city?: string | null
  barangay?: string
  address_line_1?: number
  telephone?: string
  mobile?: string
  parent: any
  details: IDetails[]
  item_id?: number
  branch_id?: number
  is_display_qty?: number
  quantity?: number
  quantity_warn?: number
  price?: number
}

export interface IDetails {
  item_id: number
  branch_id: number
  id: number
  is_active: number
  is_display_qty: number
  quantity: number
  quantity_warn: number
  price: number
  name: string
}

export interface ILinksUri {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

interface ILinks {
  url: string
  label: string
  active: boolean
}

export interface IMeta {
  current_page: number | null
  from: number | null
  last_page: number | null
  links: ILinks[]
  path: string
  per_page: number | null
  to: number | null
  total: number | null
}
