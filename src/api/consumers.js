import axios from 'axios'

export const $apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export class ConsumersService {
  static async fetchConsumers() {
    return $apiAuth.get('/customers')
  }

  static async updateConsumer({ id, data }) {
    return $apiAuth.patch(`/customers/${id}`, data)
  }
}
