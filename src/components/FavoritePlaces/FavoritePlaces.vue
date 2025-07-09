<script setup>
import IButton from '../IButton/IButton.vue'
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import EditPlaceModal from '../EditPlaceModal/EditPlaceModal.vue'
import { useModal } from '@/composables/useModal'

const props = defineProps({
  places: {
    type: Array,
    required: true,
  },
  activeId: {
    type: [String, null],
    required: true,
  },
})

const emit = defineEmits(['place-clicked', 'create'])

const { openModal: openEditModal, closeModal: closeEditModal, isOpen:isEditOpen } = useModal()
</script>

<template>
  <div class="px-6 text-black">
    <div class="text-gray mb-4">Додані маркери</div>

    <div v-if="!props.places.length" class="text-center">Немає збережених місць</div>

    <FavoritePlace
      v-for="place in props.places"
      :key="place._id"
      :title="place.title"
      :description="place.description"
      :img="place.img"
      :isActive="place._id === props.activeId"
      @click="emit('place-clicked', place._id)"
      @edit="openEditModal"
    />

    <EditPlaceModal :is-open="isEditOpen" @close="closeEditModal" />

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

// Add EditPlaceModal component to render
the specific modal for editing the favorite place. Add openEditModal and closeEditModal functions from composable to open and close the modal. Also adding isEditOpen ref to check if the modal is open or not.
