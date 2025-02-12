import types from './types.js'

export default {
  [types.SET_CONSUMERS_MUTATION](state, payload) {
    state[types.CONSUMERS_STATE] = payload
    state[types.TRANSACTION_TYPE_DISTRIBUTION_STATE] = formatTransactionData(
      payload,
      'transaction_type',
      'amount',
    )
    state[types.TRANSACTION_LOCATION_STATE] = formatTransactionData(
      payload,
      'transaction_location',
      'amount',
    )
    state[types.CONSUMERS_GENDER_STATE] = formatTransactionData(
      payload,
      'transaction_location',
      'amount',
    )
  },
}

function formatTransactionData(consumers, category, value) {
  if (!consumers.length) return []

  const transactionSummary = {}

  consumers.forEach((consumer) => {
    const type = consumer.transactions[category]
    if (!transactionSummary[type]) {
      transactionSummary[type] = 0
    }
    transactionSummary[type] += consumer.transactions[value]
  })

  return Object.keys(transactionSummary).map((key) => ({
    category: key,
    value: transactionSummary[key],
  }))
}
