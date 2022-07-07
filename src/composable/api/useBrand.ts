import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'
import useErrorNotification from './useErrorNotification'
import { useNotyf } from '../useNotyf'

const createResponse = ref()
const dropdownResponse = ref()
const isLoading = ref(false)

interface IRBrand {
  //interface response
  id: number
  name: string
}

export function useBrand() {
  const api = useApi()

  /**
   * @description Generate brand
   * @param object
   * @returns HTTP status or error message
   */
  const create = async (e: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/brand', e)
      createResponse.value = data
      useNotyf().success(`Brand <b>${data.body.name}</b> added.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
  }

  /**
   * @description Gets all of brand for dropdown
   * @returns Brand list
   */
  const dropdown = async (): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get('/v1/brand/dropdown')
      dropdownResponse.value = data.body.map((e: IRBrand) => {
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
