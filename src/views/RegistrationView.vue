<script setup>
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm.vue'
import { registerUser } from '@/api/user'
import { useRouter } from 'vue-router'
import { useMutation } from '@/composables/useMutation'

const router = useRouter()

const {
  isLoading,
  error,
  mutation: handleRegisterUser,
} = useMutation({ mutationFn: registerUser, onSuccess: () => router.replace('/map') })

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

// As we had repetetive code in the LoginView and RegistrationView, we can prevent this
repetetiveness. Idea is - handleLoginUser and handleRegisterUser had a difference only in the api
call, so we can create a composable function for it (analogy for hooks in React). Function accepts
object with API call function, onSuccess (our routing behavior, in this example) and onError
handlers. After creating the composable function we can use it in both views. Here, for example,
useMutation will receive API call function as an inner function and onSuccess handler (routing).
From the result of this composable function we desctructuring created data: isLoading marker and
error data and mutation function (inner fuction, setted up to work with registerUser request and named as handleRegisterUser while desctructuring). This function will receive credentials as an argument which will be sent to the inner mutation function ("registerUser", which we sent as an argument to the useMutation composable function).
