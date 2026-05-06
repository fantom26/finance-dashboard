import axios from 'axios'
import type { Consumer } from '@/types/consumer'

export const $apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export class ConsumersService {
  static async fetchConsumers() {
    return $apiAuth.get<Consumer[]>('/customers')
  }

  static async updateConsumer({ id, data }: { id: Consumer['id']; data: Partial<Consumer> }) {
    return $apiAuth.patch<Consumer>(`/customers/${id}`, data)
  }

  static async deleteConsumer({ id }: { id: Consumer['id'] }) {
    return $apiAuth.delete(`/customers/${id}`)
  }
}
