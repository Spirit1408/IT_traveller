<script setup>
import HomePageView from './views/HomepageView.vue'
import FavoritePlaces from './components/FavoritePlaces/FavoritePlaces.vue'
import FavoritePlace from './components/FavoritePlace/FavoritePlace.vue'
import RegistrationForm from './components/Auth/RegistrationForm/RegistrationForm.vue'
import LoginForm from './components/Auth/LoginForm/LoginForm.vue'
import IModal from './components/IModal/IModal.vue'
import { ref } from 'vue'

const isOpen = ref(false)
const closeModal = () => (isOpen.value = false)
const openModal = () => (isOpen.value = true)
</script>

<template>
  <FavoritePlaces>
    <template #list><FavoritePlace v-for="n in 4" :key="n" /></template>
  </FavoritePlaces>

  <HomePageView />

  <RegistrationForm @submit="console.log" />
  <LoginForm @submit="console.log" />
  <IModal @close="closeModal" v-if="isOpen">Hello modal!</IModal>

  <button @click="openModal">Open modal</button>
</template>

// IModal uses emit "close" to close the modal by clicking on the cross icon. IModal component has condition to render only when isOpen is true and executing emitted close function to change isOpen state. Currently IModal component is rendered in App component, but it can be rendered in any component (on a body level). It can be implemented by using Teleport component (wrapping the IModal component in it).
