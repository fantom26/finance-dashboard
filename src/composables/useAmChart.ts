import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { onMounted, onUnmounted, shallowRef, type Ref } from 'vue'
import type ChartBase from '@/components/charts/ChartBase.vue'

export function useAmChart(
  chartBase: Ref<InstanceType<typeof ChartBase> | null>,
  setup: (root: am5.Root) => void,
) {
  const root = shallowRef<am5.Root | null>(null)

  onMounted(() => {
    const el = chartBase.value?.chartRef
    if (!el) return

    root.value = am5.Root.new(el)
    root.value.setThemes([am5themes_Animated.new(root.value)])
    setup(root.value)
  })

  onUnmounted(() => {
    root.value?.dispose()
    root.value = null
  })

  return { root }
}
