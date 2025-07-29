<script setup>
import IButton from '@/components/IButton/IButton.vue'
import IInput from '@/components/IInput/IInput.vue'
import { reactive, toRaw } from 'vue'

const emit = defineEmits(['submit'])

const userData = reactive({
  email: '',
  password: '',
})

defineProps({
  isLoading: {
    default: false,
    type: Boolean,
  },
})
</script>

<template>
  <form @submit.prevent="emit('submit', toRaw(userData))">
    <IInput
      :label="$t('auth.login.email')"
      class="mb-4"
      type="email"
      :placeholder="$t('auth.login.emailPlaceholder')"
      v-model="userData.email"
    />
    <IInput :label="$t('auth.login.password')" type="password" v-model="userData.password" />

    <IButton class="mt-10 w-full" variant="gradient" type="submit" :isLoading="isLoading">{{
      $t('auth.login.submitButton')
    }}</IButton>
  </form>
</template>

// Will replace FormContainer (which was the form-wrapper) (and it's styles) to the wrapper of
RouterView and RouterLinks in AuthView page. Here will use just form element.
