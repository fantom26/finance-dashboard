export const formatEmptyCell = (value) => value ?? '-'

export function dateFormatter(params) {
  if (!params.value) {
    return 'N/A'
  }

  const date = new Date(params.value)
  return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString('en-US')
}

export function currencyFormatter(params) {
  if (!params.value) {
    return 'N/A'
  }

  return '$' + formatNumber(params.value)
}

function formatNumber(number) {
  return Math.floor(number).toLocaleString()
}
