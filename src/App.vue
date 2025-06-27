<script setup>
import HomePageView from './views/HomepageView.vue'
import FavoritePlaces from './components/FavoritePlaces/FavoriePlaces.vue'
import FavoritePlace from './components/FavoritePlace/FavoritePlace.vue'
</script>

<template>
  <FavoritePlaces>
    <template #list><FavoritePlace v-for="n in 4" :key="n" /></template>
  </FavoritePlaces>

  <HomePageView />
</template>
// Using v-slot (#) directive to render FavoritePlace component 4 times (will be rendered in FavoritePlaces component).
