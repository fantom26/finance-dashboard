import { computed, type Ref } from 'vue'
import type { Consumer } from '@/types/consumer'
import USER_FIELDS from '@/entities/user'

export function useConsumerTotals(consumers: Ref<Consumer[]>) {
  return computed(() => [
    {
      [USER_FIELDS.FULL_NAME]: 'Total',
      [USER_FIELDS.TRANSACTION_AMOUNT]: consumers.value.reduce(
        (sum, row) => sum + row.transaction_amount,
        0,
      ),
      [USER_FIELDS.ACCOUNT_BALANCE]: consumers.value.reduce(
        (sum, row) => sum + row.account_balance,
        0,
      ),
    },
  ])
}
