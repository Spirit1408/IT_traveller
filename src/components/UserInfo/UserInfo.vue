<script setup>
import { useMutation } from '@/composables/useMutation'
import UserIcon from './UserIcon.vue'
import { onMounted } from 'vue'
import { authService } from '@/api/authService'

const {
  mutation: getUser,
  data: userInfo,
  isLoading,
} = useMutation({ mutationFn: () => authService.getUserInfo() })

onMounted(() => {
  getUser()
})
</script>

<template>
  <div
    class="flex sticky top-0 items-center text-black gap-3 bg-[#ffe6dc] border-solid border-b-2 border-primary rounded-bl-2xl rounded-br-2xl px-6 py-4 mb-10"
  >
    <div class="w-10 h-10 flex items-center justify-center rounded-full bg-primary color-primary">
      <UserIcon class="text-white" />
    </div>

    <span v-if="userInfo">{{ userInfo.name }}</span>

    <span v-if="isLoading">Оновлення...</span>
  </div>
</template>
