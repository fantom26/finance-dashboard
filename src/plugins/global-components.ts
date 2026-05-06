import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseDialog from '@/components/base/BaseDialog.vue'
import type { App } from 'vue'

export default {
  install(app: App) {
    app.component('base-container', BaseContainer)
    app.component('base-button', BaseButton)
    app.component('base-dialog', BaseDialog)
  },
}
