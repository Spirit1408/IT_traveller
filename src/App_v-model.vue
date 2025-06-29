<script setup>
import HomePageView from './views/HomepageView.vue'
import FavoritePlaces from './components/FavoritePlaces/FavoritePlaces.vue'
import FavoritePlace from './components/FavoritePlace/FavoritePlace.vue'
import RegistrationForm from './components/Auth/RegistrationForm/RegistrationForm.vue'
</script>

<template>
  <FavoritePlaces>
    <template #list><FavoritePlace v-for="n in 4" :key="n" /></template>
  </FavoritePlaces>

  <HomePageView />

  <RegistrationForm @submit="console.log" />
</template>

// @submit prevent is used to prevent default behavior of the form, which is to reload the page. But by default will be used to the parent element of the form. We can fix it using emits (custom events) in the form component.
