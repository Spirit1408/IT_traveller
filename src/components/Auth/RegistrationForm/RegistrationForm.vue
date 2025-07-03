<script setup>
import IButton from '@/components/IButton/IButton.vue'
import IInput from '@/components/IInput/IInput.vue'
import { reactive, toRaw } from 'vue'

const emit = defineEmits(['submit'])

const userData = reactive({
  name: '',
  email: '',
  password: '',
})
</script>

<template>
  <form @submit.prevent="emit('submit', toRaw(userData))">
    <IInput label="Повне ім'я" class="mb-4" v-model="userData.name" />
    <IInput
      label="Електронна пошта"
      class="mb-4"
      type="email"
      placeholder="email@gmail.com"
      v-model="userData.email"
    />
    <IInput label="Пароль" type="password" v-model="userData.password" />

    <IButton class="mt-10 w-full" variant="gradient" type="submit">Створити аккаунт</IButton>
  </form>
</template>

// Will replace FormContainer (which was the form-wrapper) (and it's styles) to the wrapper of
RouterView and RouterLinks in AuthView page. Here will use just form element.
