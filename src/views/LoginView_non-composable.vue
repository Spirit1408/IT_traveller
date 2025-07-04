<script setup>
import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'
import { login } from '@/api/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const isLoading = ref(false)

const handleLoginUser = async (credentials) => {
  try {
    isLoading.value = true
    await login(credentials)
    router.replace('/map')
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <LoginForm @submit="handleLoginUser" :isLoading="isLoading" />
</template>
