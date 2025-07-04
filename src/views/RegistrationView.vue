<script setup>
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm.vue'
import { registerUser } from '@/api/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const isLoading = ref(false)

const handleRegisterUser = async (credentials) => {
  try {
    isLoading.value = true
    await registerUser(credentials)

    router.replace('/map')
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <RegistrationForm @submit="handleRegisterUser" :isLoading="isLoading" />
</template>

// emit from RegistrationForm will be sent to the parent component (current one). By event "submit"
we can gather data and sent it by special handler to the server. After successful registration we
can move to the next page using useRouter function. Creating router instance to navigate to the map
page. Method replace will replace current page with the map page (to prevent going back to the
registration page while clicking on the back button in the browser).

// "isLoading" - state for
button in form, which will be true while sending data to the server. Sendong its value by prop to
the RegistrationForm component, when in will be sent to the IButton component - to change content of
the button depending on the isLoading value.
