import phoneMasks from '@/utils/phoneMasks'
import { Mask } from 'maska'
import type { ValueFormatterParams } from 'ag-grid-community'
import type { Consumer } from '@/types/consumer'

function formatValue(value: unknown, formatter: (v: string) => string): string {
  if (value === null || value === undefined || value === '') return ''
  return formatter(String(value))
}

export const emptyCellFormatter = (params: ValueFormatterParams) =>
  formatValue(params.value, (v) => v)

export const dateFormatter = (params: ValueFormatterParams) =>
  formatValue(params.value, (v) => {
    const date = new Date(v)
    return Number.isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-US')
  })

export const currencyFormatter = (params: ValueFormatterParams, currencySymbol = '$') =>
  formatValue(params.value, (v) => `${currencySymbol}${formatNumber(Number(v))}`)

function formatNumber(number: number): string {
  return Math.floor(number).toLocaleString()
}

export function formatPhoneNumber(params: ValueFormatterParams): string | null | undefined {
  if (!params.value || !params.data?.country_code) return params.value as string | null | undefined

  const countryCode = params.data.country_code as string

  const maskPattern = (phoneMasks as Record<string, string>)[countryCode] || '###-###-####'

  const mask = new Mask({ mask: maskPattern })

  return mask.masked(String(params.value))
}

type SummaryReducer = (
  category: string,
  value: string | null,
  summary: Record<string, number>,
  consumer: Consumer,
) => Record<string, number>

export function countEntityByProperty(
  category: string,
  _value: string | null,
  summary: Record<string, number>,
  consumer: Consumer,
): Record<string, number> {
  const type = consumer[category as keyof Consumer]
  const key = String(type)
  if (!Object.prototype.hasOwnProperty.call(summary, key)) {
    summary[key] = 0
  }
  summary[key] += 1
  return summary
}

export function countConsumerByTransactionInfo(
  category: string,
  value: string | null,
  summary: Record<string, number>,
  consumer: Consumer,
): Record<string, number> {
  const type = consumer[category as keyof Consumer]
  const key = String(type)
  if (!Object.prototype.hasOwnProperty.call(summary, key)) {
    summary[key] = 0
  }
  summary[key] += Number(consumer[value as keyof Consumer])
  return summary
}

export function formatData(
  consumers: Consumer[],
  category: string,
  value: string | null,
  strategy: SummaryReducer,
): { category: string; value: number }[] {
  if (!consumers.length) return []

  const boundStrategy = strategy.bind(null, category, value) as (
    summary: Record<string, number>,
    consumer: Consumer,
  ) => Record<string, number>

  const summary = consumers.reduce(boundStrategy, {})

  return Object.keys(summary).map((key) => ({
    category: key,
    value: summary[key],
  }))
}
