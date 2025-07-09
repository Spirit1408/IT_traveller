<script setup>
import IButton from '../IButton/IButton.vue'
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import EditPlaceModal from '../EditPlaceModal/EditPlaceModal.vue'
import { useModal } from '@/composables/useModal'
import { computed, ref } from 'vue'
import { useMutation } from '@/composables/useMutation'
import { updateFavoritePlace } from '@/api/favorite-places'

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

const emit = defineEmits(['place-clicked', 'create', 'updated'])

const { openModal: openEditModal, closeModal: closeEditModal, isOpen: isEditOpen } = useModal()

const { mutation: updatePlace, isLoading: isUpdateLoading } = useMutation({
  mutationFn: (formData) => updateFavoritePlace(formData),
  onSuccess: () => {
    closeEditModal(), emit('updated')
  },
})

const selectedId = ref(null)
const selectedPlace = computed(() => props.places.find((place) => place._id === selectedId.value))

const handleEditPlace = (id) => {
  selectedId.value = id
  openEditModal()
}

const handleSubmit = (formData) => {
  updatePlace(formData)
}
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
      @edit="handleEditPlace(place._id)"
    />

    <EditPlaceModal
      :is-open="isEditOpen"
      @close="closeEditModal"
      :place="selectedPlace"
      @submit="handleSubmit"
      :isLoading="isUpdateLoading"
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

// Add EditPlaceModal component to render
the specific modal for editing the favorite place. Add openEditModal and closeEditModal functions
from composable to open and close the modal. Also adding isEditOpen ref to check if the modal is
open or not.

// Add handleEditPlace function to open the modal with specific place data and ref for
storaging the id of the place. Clicking on edit button in the element will call this function with
id of the clicked place. Id of the clicked place will be storaging in selectedId ref. According to
this id we can find the place data and storaging it in selectedPlace(computed for reactivity). Then
we can open the modal and send place data to it by "place" prop.

// Add handleUpdatePlace function
to close the modal after updating the place and sending the data to the server. // Using useMutation
to create an async function for updating the place. Sendind function as an argument for sending the
data to the server (updateFavoritePlace). Receiving async function updatePlace and isLoading
statement (for the button in the modal).

// Define new event "updated" to HomepageView component to
update the list of favorite places after successful updating the place.
