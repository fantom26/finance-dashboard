import types from './types.js'

export default {
  [types.SET_CONSUMERS_MUTATION](state, payload) {
    state[types.CONSUMERS_STATE] = payload
    state[types.TRANSACTION_TYPE_DISTRIBUTION_STATE] = formatDataByDistributionType(payload)
  },
}

function formatDataByDistributionType(consumers) {
  if (!consumers.length) return []

  const transactionSummary = {}

  consumers.forEach((consumer) => {
    const type = consumer.transactions.transaction_type
    if (!transactionSummary[type]) {
      transactionSummary[type] = 0
    }
    transactionSummary[type] += consumer.transactions.amount
  })

  return Object.keys(transactionSummary).map((key) => ({
    category: key,
    value: transactionSummary[key],
  }))
}
