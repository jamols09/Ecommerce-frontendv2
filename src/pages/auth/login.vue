<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

import { useDarkmode } from '/@src/stores/darkmode'
import { useNotyf } from '/@src/composable/useNotyf'
import { useAuth } from '/@src/composable/api/useAuth'
import { useUserSession } from '/@src/stores/userSession'
import sleep from '/@src/utils/sleep'

const api = useAuth()
const isLoading = ref(false)
const darkmode = useDarkmode()
const router = useRouter()
const route = useRoute()
const notyf = useNotyf()
const userSession = useUserSession()
const redirect = route.query.redirect as string
const form = reactive({
  email: '',
  password: '',
})

const onLogin = async () => {
  isLoading.value = true

  try {
    await api.signIn(form)
    await sleep(300)

    if (api.signInResponse.value !== undefined) {
      userSession.setLoggedIn()

      if (redirect) {
        router.push(redirect)
      } else {
        router.push({
          name: 'app',
        })
      }
    }
  } catch (err: any) {
    notyf.error('Invalid credentials.')
  }

  isLoading.value = false
}

onMounted(() => {
  api.getCookie()
})

useHead({
  title: 'Bentii - Login',
})
</script>

<template>
  <div class="auth-wrapper-inner is-single">
    <!--Fake navigation-->
    <div class="auth-nav">
      <div class="left"></div>
      <div class="center">
        <RouterLink :to="{ name: 'index' }" class="header-item">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>
      </div>
      <div class="right">
        <label class="dark-mode ml-auto">
          <input
            type="checkbox"
            :checked="!darkmode.isDark"
            @change="darkmode.onChange"
          />
          <span></span>
        </label>
      </div>
    </div>

    <!--Single Centered Form-->
    <div class="single-form-wrap">
      <div class="inner-wrap">
        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="onLogin">
            <div class="login-form">
              <!--Form Title-->
              <div class="auth-head">
                <h2>Welcome!</h2>
                <br />
                <p>Start managing your business now!</p>
              </div>

              <V-Field>
                <V-Control icon="feather:mail">
                  <input
                    v-model="form.email"
                    class="input"
                    type="email"
                    placeholder="Email"
                    autocomplete="off"
                  />
                </V-Control>
              </V-Field>
              <V-Field>
                <V-Control icon="feather:lock">
                  <input
                    v-model="form.password"
                    class="input"
                    type="password"
                    placeholder="Password"
                    autocomplete="off"
                  />
                </V-Control>
              </V-Field>
              <!-- Redirect -->
              <V-Field class="forgot-link">
                <small>
                  <RouterLink :to="{ name: 'auth-login' }">
                    <u>Forgot password?</u>
                  </RouterLink>
                </small>
              </V-Field>

              <!-- Submit -->
              <V-Field>
                <V-Control class="login">
                  <V-Button
                    :loading="isLoading"
                    type="submit"
                    color="primary"
                    bold
                    fullwidth
                    raised
                    >Sign In</V-Button
                  >
                </V-Control>
              </V-Field>
              <!-- Redirect -->
              <V-Field class="forgot-link">
                <small class="dark-inverted">
                  Don't have account yet?
                  <RouterLink :to="{ name: 'auth-signup' }">
                    <u>Sign-up here!</u>
                  </RouterLink>
                </small>
              </V-Field>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
