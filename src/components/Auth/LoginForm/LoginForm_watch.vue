<script setup>
import FormContainer from '../FormContainer.vue'
import IButton from '@/components/IButton/IButton.vue'
import IInput from '@/components/IInput/IInput.vue'
import { reactive, toRaw, watch } from 'vue'

const emit = defineEmits(['submit'])

const userData = reactive({
  email: '',
  password: '',
})

watch(
  userData,
  () => {
    console.log('User data changed!', userData)
  },
  { immediate: true },
)
</script>

<template>
  <FormContainer @submit.prevent="emit('submit', toRaw(userData))">
    <IInput
      label="Електронна пошта"
      class="mb-4"
      type="email"
      placeholder="email@gmail.com"
      v-model="userData.email"
    />
    <IInput label="Пароль" type="password" v-model="userData.password" />

    <IButton class="mt-10 w-full" variant="gradient" type="submit">Увійти</IButton>
  </FormContainer>
</template>

// watch - functionality for monitoring changes of selected data. Extra parameter "immediate" - for
immediate execution of the function (when component is mounted).
