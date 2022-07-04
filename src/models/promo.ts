import type { Ref } from 'vue'

/***************************
 * PROMO TYPES DECLARATION *
 ***************************/

export type PromoType = 'raw' | 'percent'
export type PromoRepeatOptions = 'every_week' | 'every_month' | 'every_year'
export type PromoOptions = 'active' | 'unlimited' | 'specific'
export type FlashOptions = 'active' | 'specific'

export interface TreeOptions {
  options: object[]
  value: object[]
}
export interface StartEndDate {
  start: Date
  end: Date
}
export interface DateTimeFrame {
  start: Date
  end: Date
}
export interface Promo {
  active: boolean
  unlimited?: boolean
  specific?: boolean
  name?: string
  description?: string
  type?: PromoType
  amount: number | null
  quantity?: number | null
  requiredAmount?: number
  repeat?: PromoRepeatOptions
  date: DateTimeFrame
}

export type PromoOptionsArray = PromoOptions[]
export type FlashOptionsArray = FlashOptions[]
