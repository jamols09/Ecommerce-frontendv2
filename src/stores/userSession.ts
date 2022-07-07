import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref /*, computed */ } from 'vue'
import { useStorage } from '@vueuse/core'

export type UserData = Record<string, any> | null

export const useUserSession = defineStore('userSession', () => {
  // token will be synced with local storage
  // @see https://vueuse.org/core/usestorage/
  const token = useStorage('token', '')

  const user = ref<Partial<UserData>>()
  const loading = ref(true)

  // const isLoggedIn = computed(() => token.value !== undefined && token.value !== '')
  const isLoggedIn = useStorage('logged_in', false)

  function setUser(newUser: Partial<UserData>) {
    user.value = newUser
  }

  function setToken(newToken: string) {
    token.value = newToken
  }

  function setLoading(newLoading: boolean) {
    loading.value = newLoading
  }

  function setLoggedIn() {
    isLoggedIn.value = true
  }

  async function logoutUser() {
    token.value = undefined
    isLoggedIn.value = false
    user.value = undefined
  }

  return {
    user,
    token,
    isLoggedIn,
    loading,
    setLoggedIn,
    logoutUser,
    setUser,
    setToken,
    setLoading,
  } as const
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserSession, import.meta.hot))
}
