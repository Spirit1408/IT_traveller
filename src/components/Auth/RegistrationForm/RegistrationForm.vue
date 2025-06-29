<script setup>
import IButton from '@/components/IButton/IButton.vue'
import IInput from '@/components/IInput/IInput.vue'

const emit = defineEmits(['submit'])
</script>

<template>
  <form
    class="max-w-[500px] w-full bg-white p-10 rounded-2xl"
    @submit.prevent="emit('submit', { name: 'Vasya' })"
  >
    <IInput label="Повне ім'я" class="mb-4" />
    <IInput label="Електронна пошта" class="mb-4" type="email" placeholder="email@gmail.com" />
    <IInput label="Пароль" type="password" />

    <IButton class="mt-10 w-full" variant="gradient" type="submit">Створити аккаунт</IButton>
  </form>
</template>
// All the props of the IInput component will be applied to the form element (by default). But in
the IInput component we can define all the props (and events) and it's usage in the specific
elements (label, input etc). Emits - functionality for sending data from child to parent (custom
events). In other speaking - we are saying that we want to send specific data (which we can write in
calling of the "emit" function) from the form to the parent component (App), preventing default
behavior of the form.
