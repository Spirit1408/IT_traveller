<script setup>
import IButton from '../IButton/IButton.vue'
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'

const props = defineProps({
  places: {
    type: Array,
    required: true,
  },
  activeId: {
    type: [Number, null],
    required: true,
  },
})

const emit = defineEmits(['place-clicked', 'create'])
</script>

<template>
  <div class="px-6 text-black">
    <div class="text-gray mb-4">Додані маркери</div>

    <div v-if="!props.places.length" class="text-center">Немає збережених місць</div>

    <FavoritePlace
      v-for="place in props.places"
      :key="place.id"
      :title="place.title"
      :description="place.description"
      :img="place.img"
      :isActive="place.id === props.activeId"
      @click="emit('place-clicked', place.id)"
    />

    <IButton class="mt-10 w-full" variant="gradient" @click="emit('create')">Додати маркер</IButton>
  </div>
</template>

// Adding prop for dynamically receiving the list of markers. Each one is an array of objects. Based
on it we can render the list of markers and putting specific data of each of them by props "title",
"description" and "img" to the FavoritePlace component. Also adding "isActive" prop to check if
marker is active or not. Clicking on the element should emit "place-clicked" event with id of the
clicked place to App component, where we will update "activeId" by id of the clicked place and
gather its coordinates.

// "create" event is emitted to HomepageView component, where we will open
CreateNewPlaceModal component on clicking on this button.
