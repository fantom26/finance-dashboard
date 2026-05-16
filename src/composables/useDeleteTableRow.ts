import { ref, type InjectionKey, type Ref, provide } from 'vue'

type DeleteRowInfo = {
  show: boolean
  id: UUID | null
}

export const DeleteRowInfoKey = Symbol() as InjectionKey<Ref<DeleteRowInfo>>

export const useDeleteTableRow = ({
  deleteRow,
}: {
  deleteRow: (payload: { id: UUID }) => Promise<void>
}) => {
  const deleteRowInfo = ref<DeleteRowInfo>({
    show: false,
    id: null,
  })

  function agreeDeleting() {
    if (deleteRowInfo.value.id) {
      deleteRow({ id: deleteRowInfo.value.id })
    }

    closeDialog()
  }

  function closeDialog() {
    deleteRowInfo.value = {
      show: false,
      id: null,
    }
  }

  provide(DeleteRowInfoKey, deleteRowInfo)

  return { closeDialog, agreeDeleting, deleteRowInfo }
}
