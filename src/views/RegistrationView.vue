<script setup>
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm.vue'
import { authService } from '@/api/authService'
import { useRouter } from 'vue-router'
import { useMutation } from '@/composables/useMutation'

const router = useRouter()

const {
  isLoading,
  error,
  mutation: handleRegisterUser,
} = useMutation({
  mutationFn: (credentials) => authService.registerUser(credentials),
  onSuccess: () => router.replace('/map'),
})

// const handleRegisterUser = async (credentials) => {
//   try {
//     isLoading.value = true
//     await registerUser(credentials)

//     router.replace('/map')
//   } catch (error) {
//     console.error(error)
//   } finally {
//     isLoading.value = false
//   }
// }
</script>

<template>
  <RegistrationForm @submit="handleRegisterUser" :isLoading="isLoading" />

  <div v-if="error" class="text-red-500">{{ error.message }}</div>
</template>
