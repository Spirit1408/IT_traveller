<script setup>
import LogoutIcon from './LogoutIcon.vue'
import { useMutation } from '@/composables/useMutation'
import { useRouter } from 'vue-router'
import { authService } from '@/api/authService'

const router = useRouter()

const {
  mutation: logoutUser,
  isLoading,
  error,
} = useMutation({
  mutationFn: () => authService.logout(),
  onSuccess: () => router.replace('/'),
})
</script>

<template>
  <div>
    <button class="flex gap-2 items-center px-6 text-black" @click="logoutUser">
      <span v-if="isLoading">{{ $t('map.logoutLoading') }}</span> <span v-else>{{ $t('map.logout') }}</span> <LogoutIcon />
    </button>

    <span v-if="error" class="text-red-500 mt-3">{{ $t('map.common.errorSubmitButton') }}</span>
  </div>
</template>

// Using useMutation for executing logout request. Using router to redirect user to homepage after successful logout action.
