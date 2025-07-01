<script setup>
import HomePageView from './views/HomepageView.vue'
import FavoritePlaces from './components/FavoritePlaces/FavoritePlaces.vue'
import FavoritePlace from './components/FavoritePlace/FavoritePlace.vue'
import RegistrationForm from './components/Auth/RegistrationForm/RegistrationForm.vue'
import LoginForm from './components/Auth/LoginForm/LoginForm.vue'
import CreateNewPlaceModal from './components/CreateNewPlaceModal/CreateNewPlaceModal.vue'
import { MapboxMap } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapSettings } from './map/settings.js'
import { ref } from 'vue'

const isOpen = ref(false)

const closeModal = () => (isOpen.value = false)

const openModal = () => (isOpen.value = true)

const { style, apiToken } = mapSettings
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
      <MapboxMap class="w-full h-full" :access-token="apiToken" :map-style="style" :center="[-38.94825316249595, -15.683918784057834 ]" zoom="13"></MapboxMap>
    </div>
  </main>
</template>

// Connecting Mapbox to our project. Mapbox requires styles and access token to properly connect to
the server. Putting this data dynamically (from settings.js). Also reccomended to hide access token
from publishing on repository. Attribute "center" is a starting point of the map. "Zoom" - to set the starting zoom level (whole map by default).
