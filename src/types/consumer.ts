export interface Consumer {
  id: string | number
  full_name: string
  date_of_birth: string
  gender: string
  email: string
  phone_number: string
  country_code?: string
  address: string
  city: string
  country: string
  employment_status: string
  account_id: string
  account_type: string
  account_balance: number
  currency: string
  account_open_date: string
  account_status: string
  transaction_id: string
  transaction_date: string
  transaction_type: string
  transaction_amount: number
  balance_after_transaction: number
  transaction_method: string
  transaction_location: string
}
