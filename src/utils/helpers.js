function formatValue(value, formatter) {
  if (!value) return 'N/A'
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

export function createNestedObject(path, value) {
  const keys = path.split('.')
  let obj = {}
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = {}
    current = current[keys[i]]
  }

  current[keys[keys.length - 1]] = value
  return obj
}
