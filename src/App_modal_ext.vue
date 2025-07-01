<script setup>
import HomePageView from './views/HomepageView.vue'
import FavoritePlaces from './components/FavoritePlaces/FavoritePlaces.vue'
import FavoritePlace from './components/FavoritePlace/FavoritePlace.vue'
import RegistrationForm from './components/Auth/RegistrationForm/RegistrationForm.vue'
import LoginForm from './components/Auth/LoginForm/LoginForm.vue'
import CreateNewPlaceModal from './components/CreateNewPlaceModal/CreateNewPlaceModal.vue'
import MapBox from './components/MapBox/MapBox.vue'
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

  <CreateNewPlaceModal :isOpen="isOpen" @close="closeModal" @submit="console.log" />

  <main class="flex h-screen">
    <div class="bg-white h-full w-[400px] shrink-0 overflow-auto pb-10">
      <FavoritePlaces @add-marker="openModal">
        <template #list><FavoritePlace v-for="n in 4" :key="n" /></template>
      </FavoritePlaces>
    </div>

    <div class="w-full h-full flex items-center justify-center text-6xl">
      <MapBox />
    </div>
  </main>
</template>
