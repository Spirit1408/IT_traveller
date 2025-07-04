<script setup>
import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'
import { authService } from '@/api/authService'
import { useRouter } from 'vue-router'
import { useMutation } from '@/composables/useMutation'

const router = useRouter()

const {
  isLoading,
  error,
  mutation: handleLoginUser,
} = useMutation({
  mutationFn: (credentials) => authService.login(credentials),
  onSuccess: () => router.replace('/map'),
})

// const handleLoginUser = async (credentials) => {
//   try {
//     isLoading.value = true
//     await login(credentials)
//     router.replace('/map')
//   } catch (error) {
//     console.error(error)
//   } finally {
//     isLoading.value = false
//   }
// }
</script>

<template>
  <LoginForm @submit="handleLoginUser" :isLoading="isLoading" />

  <div v-if="error" class="text-red-500">{{ error.message }}</div>
</template>

// Instead of using primary "login" function - using function, which accepts credentials and calls
"login" method of authService with that credentials, which has ability to set access token, achieved
from the response, for further requests to the server. Using other function instead of just
"authService.login" because calling the method from the authService (but not a function!). And
method will loose "this" context, so we should wrap the calling in a outer function, through which
we correctly can send credentials to the method "login".
