<script setup>
import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'
import { login } from '@/api/user'
import { useRouter } from 'vue-router'
import { useMutation } from '@/composables/useMutation'

const router = useRouter()

const {
  isLoading,
  error,
  mutation: handleLoginUser,
} = useMutation({ mutationFn: login, onSuccess: () => router.replace('/map') })

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
