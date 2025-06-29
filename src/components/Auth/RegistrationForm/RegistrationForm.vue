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
  <form
    class="max-w-[500px] w-full bg-white p-10 rounded-2xl"
    @submit.prevent="emit('submit', toRaw(userData))"
  >
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
// using v-model to gather data from the form fields. This data will be emitted to App component,
where will be shown in the console. Using specific properties from userData to connect with the
specific form fields. By default data, which App will receive, will be in Proxy(Object) format
(because "reactive" function return Proxy(Object)). To send data as an object, we need to use
"toRaw" function!
