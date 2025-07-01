<script setup>
import IButton from '../IButton/IButton.vue'
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'

const props = defineProps({
  places: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="px-6">
    <div class="text-gray mb-4">Додані маркери</div>

    <FavoritePlace
      v-for="place in props.places"
      :key="place.id"
      :title="place.title"
      :description="place.description"
      :img="place.img"
    />

    <IButton class="mt-10 w-full" variant="gradient">Додати маркер</IButton>
  </div>
</template>

// Adding prop for dynamically receiving the list of markers. Each one is an array of objects. Based
on it we can render the list of markers and putting specific data of each of them by props "title", "description" and "img" to
the FavoritePlace component.
