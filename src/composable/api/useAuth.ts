import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'

const signInResponse = ref<User>()
const loggedInResponse = ref<User>() //debugging purpose

interface User {
  id: number
  username: string
  last_name: string
  birthdate: Date
  is_active: number
  email: string
}

export function useAuth() {
  const api = useApi()
  /**
   * Trigger CSRF Token
   * @param data object
   * @returns HTTP status or error message
   */
  const getCookie = async (): Promise<any> => {
    try {
      await api.get('/sanctum/csrf-cookie')
    } catch (err: any) {
      throw new Error(err)
    }
  }

  /**
   * Sign-in Account
   * @param auth object
   * @returns HTTP status or error message
   */
  const signIn = async (auth: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/login', auth)
      signInResponse.value = data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  /**
   * Check account if legit
   * @returns HTTP status or error message
   */
  const getUser = async (): Promise<any> => {
    try {
      const { data } = await api.get('/user')
      console.log(data)
      loggedInResponse.value = data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  return {
    signInResponse,
    loggedInResponse,
    getUser,
    signIn,
    getCookie,
  } as const // as const to prevent from updating
}
