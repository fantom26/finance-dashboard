function formatValue(value, formatter) {
  if (!value) return ''
  return formatter(value)
}

export const emptyCellFormatter = (params) => formatValue(params.value, (v) => v)

export const dateFormatter = (params) =>
  formatValue(params.value, (v) => {
    const date = new Date(v)
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString('en-US')
  })

export const currencyFormatter = (params, currencySymbol = '$') =>
  formatValue(params.value, (v) => `${currencySymbol}${formatNumber(v)}`)

function formatNumber(number) {
  return Math.floor(number).toLocaleString()
}

export function countEntityByProperty(category, value, summary, consumer) {
  const type = consumer[category]
  if (!Object.prototype.hasOwnProperty.call(summary, type)) {
    summary[type] = 0
  }
  summary[type] += 1
  return summary
}

export function countConsumerByTransactionInfo(category, value, summary, consumer) {
  const type = consumer[category]
  if (!Object.prototype.hasOwnProperty.call(summary, type)) {
    summary[type] = 0
  }
  summary[type] += consumer[value]
  return summary
}

export function formatData(consumers, category, value, strategy) {
  if (!consumers.length) return []

  const boundStrategy = strategy.bind(this, category, value)

  const summary = consumers.reduce(boundStrategy, {})

  return Object.keys(summary).map((key) => ({
    category: key,
    value: summary[key],
  }))
}
