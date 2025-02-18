import types from './types.js'

export default {
  [types.SET_CONSUMERS_MUTATION](state, payload) {
    state[types.CONSUMERS_STATE] = payload
    state[types.TRANSACTION_TYPE_DISTRIBUTION_STATE] = formatData(
      payload,
      'transaction_type',
      'transaction_amount',
      countConsumerByTransactionInfo,
    )
    state[types.TRANSACTION_LOCATION_STATE] = formatData(
      payload,
      'transaction_location',
      'transaction_amount',
      countConsumerByTransactionInfo,
    )
    state[types.CONSUMERS_GENDER_STATE] = formatData(payload, 'gender', null, countEntityByProperty)
  },
  [types.UPDATE_CONSUMER_MUTATION](state, updatedConsumer) {
    const index = state[types.CONSUMERS_STATE].findIndex((c) => c.id === updatedConsumer.id)

    if (index !== -1) {
      state[types.CONSUMERS_STATE].splice(index, 1, updatedConsumer)
    }
  },
  [types.DELETE_CONSUMER_MUTATION](state, updatedConsumer) {
    const index = state[types.CONSUMERS_STATE].findIndex((c) => c.id === updatedConsumer.id)

    if (index !== -1) {
      state[types.CONSUMERS_STATE].splice(index, 1)
    }
  },
}

function countEntityByProperty(category, value, summary, consumer) {
  const type = consumer[category]
  if (!Object.prototype.hasOwnProperty.call(summary, type)) {
    summary[type] = 0
  }
  summary[type] += 1
  return summary
}

function countConsumerByTransactionInfo(category, value, summary, consumer) {
  const type = consumer[category]
  if (!Object.prototype.hasOwnProperty.call(summary, type)) {
    summary[type] = 0
  }
  summary[type] += consumer[value]
  return summary
}

function formatData(consumers, category, value, strategy) {
  if (!consumers.length) return []

  const boundStrategy = strategy.bind(this, category, value)

  const summary = consumers.reduce(boundStrategy, {})

  return Object.keys(summary).map((key) => ({
    category: key,
    value: summary[key],
  }))
}
