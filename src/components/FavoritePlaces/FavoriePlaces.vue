<script setup>
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import IButton from '../IButton/IButton.vue';
</script>

<template>
  <div class="px-6">
    <div class="text-gray mb-4">Додані маркери</div>

    <FavoritePlace v-for="n in 4" :key="n" />

    <IButton class="mt-10 w-full">Додати маркер</IButton>
  </div>
</template>
// Using v-for directive to render FavoritePlace component 4 times.
