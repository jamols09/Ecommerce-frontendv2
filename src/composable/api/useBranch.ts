import { ref } from 'vue'
import useErrorNotification from './useErrorNotification'
import { useApi } from '/@src/composable/useApi'
import useNotificationType from './useNotificationType'

const notifType = useNotificationType.notifType
const itemsOfBranchTableResponse = ref()
const statusResponse = ref()
const tableResponse = ref()
const createResponse = ref()
const dropdownResponse = ref()
const removeResponse = ref()
const detailsResponse = ref()
const isLoading = ref(false)
const isModalLoading = ref(false)

interface IRBranchDropdown {
  id: number
  name: string
}

export function useBranch() {
  const api = useApi()

  /**
   * @description Generate branch
   * @param object
   * @returns HTTP status or error message
   */
  const create = async (params: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/branch', params)
      createResponse.value = data
      notifType(`Branch <b>${params.name}</b> successfully added.`, 'success')
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
  }

  /**
   * @description Gets all of branch for dropdown
   * @returns Branch list
   */
  const dropdown = async (): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(`/v1/branch/dropdown`)
      dropdownResponse.value = data.result.map((e: IRBranchDropdown) => {
        return { value: e.id, label: e.name }
      })
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Gets a list of paginated branch for table
   * @param object
   * @returns Paginated branch
   */
  const table = async (params?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(`/v1/branch`, { params: params })
      tableResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Soft deletes list of branches; will not fail if branch contains an item
   * @param array
   * @returns branch
   */
  const remove = async (params?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post(`/v1/branch/delete`, params)
      removeResponse.value = data
      notifType(`Branch(es) successfully removed.`, 'warning')
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Set branch status to active or inactive
   * @param array
   * @returns status
   */
  const status = async (params?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post(`/v1/branch/status`, params)
      statusResponse.value = data
      notifType(`Branch(es) successfully ${params?.status}d.`, 'success')
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Get branch details by id
   * @param number id
   * @returns Branch model
   */
  const details = async (id: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(`/v1/branch/${id}`)
      detailsResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Update branch details by id
   * @param object branch
   */
  const update = async (params: any, id: number | string | string[]): Promise<any> => {
    try {
      isLoading.value = true
      await api.patch(`/v1/branch/${id}`, params)
      notifType(`Branch successfully updated.`, 'success')
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Get all items from specific branch
   * @param object items
   */
  const itemsOfBranchTable = async (id: number, params?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(`/v1/branch/${id}/items`, {
        params: params,
      })
      itemsOfBranchTableResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Update item from specific branch
   * @param number id
   * @param object params
   */
  const updateItemOfBranch = async (id: number, params: any): Promise<any> => {
    try {
      await api.patch(`/v1/branch/${id}/items`, params)
      notifType(`Item successfully updated.`, 'success')
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
  }

  return {
    itemsOfBranchTableResponse,
    removeResponse,
    tableResponse,
    createResponse,
    dropdownResponse,
    detailsResponse,
    isLoading,
    isModalLoading,
    updateItemOfBranch,
    dropdown,
    create,
    table,
    remove,
    status,
    details,
    update,
    itemsOfBranchTable,
  } as const // as const is a typescript keyword to prevent from updating
}
