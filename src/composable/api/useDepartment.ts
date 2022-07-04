import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'
import useErrorNotification from './useErrorNotification'
import useNotyf from '../useNotyf'

const createResponse = ref()
const dropdownResponse = ref()
const isLoading = ref(false)

interface IRDepartment {
  //interface response
  id: number
  name: string
}

export function useDepartment() {
  const api = useApi()

  /**
   * @param object item
   * @returns HTTP status or error message
   */
  const create = async (e: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/department', e)
      createResponse.value = data
      useNotyf().success(`Department <b>${data.body.name}</b> added.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
  }

  /**
   * @returns Department or error message
   */
  const dropdown = async (): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get('/v1/department/dropdown')
      dropdownResponse.value = data.body.map((e: IRDepartment) => {
        return { value: e.id, label: e.name }
      })
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  return {
    dropdownResponse,
    createResponse,
    isLoading,
    create,
    dropdown,
  }
}
