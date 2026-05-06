import { defineStore } from 'pinia'
import { ConsumersService } from '@/api/consumers'
import { countConsumerByTransactionInfo, countEntityByProperty, formatData } from '@/utils/helpers'
import USER_FIELDS from '@/entities/user'
import type { Consumer } from '@/types/consumer'

interface State {
  consumers: Consumer[]
}

export const useConsumersStore = defineStore('consumers', {
  state: (): State => ({
    consumers: [],
  }),
  getters: {
    hasConsumers: (state) => state.consumers.length > 0,
    dataByTransTypeDistribution(state) {
      return formatData(
        state.consumers,
        USER_FIELDS.TRANSACTION_TYPE,
        USER_FIELDS.TRANSACTION_AMOUNT,
        countConsumerByTransactionInfo,
      )
    },
    dataByTransLocation(state) {
      return formatData(
        state.consumers,
        USER_FIELDS.TRANSACTION_LOCATION,
        USER_FIELDS.TRANSACTION_AMOUNT,
        countConsumerByTransactionInfo,
      )
    },
    dataByGender(state) {
      return formatData(state.consumers, USER_FIELDS.GENDER, null, countEntityByProperty)
    },
  },
  actions: {
    async loadConsumers() {
      const response = await ConsumersService.fetchConsumers()

      this.consumers = response.data
    },

    async updateConsumerInfo(payload: { id: Consumer['id']; data: Partial<Consumer> }) {
      const response = await ConsumersService.updateConsumer(payload)

      if (response.status === 200) {
        const { id } = response.data
        const index = this.consumers.findIndex((c) => c.id === id)

        if (index !== -1) {
          this.consumers[index] = response.data
        }
      }
    },

    async deleteConsumer(payload: { id: Consumer['id'] }) {
      const response = await ConsumersService.deleteConsumer(payload)

      if (response.status === 200) {
        const { id } = payload
        const index = this.consumers.findIndex((c) => c.id === id)

        if (index !== -1) {
          this.consumers.splice(index, 1)
        }
      }
    },
  },
})
