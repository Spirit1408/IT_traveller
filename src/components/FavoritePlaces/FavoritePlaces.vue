<script setup>
import IButton from '../IButton/IButton.vue'
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import EditPlaceModal from '../EditPlaceModal/EditPlaceModal.vue'
import { useModal } from '@/composables/useModal'
import { computed, ref } from 'vue'
import { useMutation } from '@/composables/useMutation'
import { deleteFavoritePlace, updateFavoritePlace } from '@/api/favorite-places'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.vue'

const props = defineProps({
  places: {
    type: Array,
    required: true,
  },
  activeId: {
    type: [String, null],
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['place-clicked', 'create', 'updated'])

const { openModal: openEditModal, closeModal: closeEditModal, isOpen: isEditOpen } = useModal()
const {
  openModal: openConfirmationModal,
  closeModal: closeConfirmationModal,
  isOpen: isConfirmationModalOpen,
} = useModal()

const { mutation: updatePlace, isLoading: isUpdateLoading } = useMutation({
  mutationFn: (formData) => updateFavoritePlace(formData),
  onSuccess: () => {
    closeEditModal(), emit('updated')
  },
})

const {
  mutation: deletePlace,
  isLoading: isDeleteLoading,
  error: deleteError,
} = useMutation({
  mutationFn: (id) => deleteFavoritePlace(id),
  onSuccess: () => {
    closeConfirmationModal()
    idOfDeletedPlace.value = null
    emit('updated')
  },
})

const selectedId = ref(null)
const selectedPlace = computed(() => props.places.find((place) => place.id === selectedId.value))
const idOfDeletedPlace = ref(null)

const handleEditPlace = (id) => {
  selectedId.value = id
  openEditModal()
}

const handleOpenConfirmationModal = (id) => {
  idOfDeletedPlace.value = id
  openConfirmationModal()
}

const handleSubmit = (formData) => {
  updatePlace(formData)
}

const handleDeletePlace = () => {
  deletePlace(idOfDeletedPlace.value)
}
</script>

<template>
  <div class="px-6 text-black">
    <div class="text-gray mb-4">{{ $t('map.favorites') }}</div>

    <div v-if="!props.places.length && !props.isLoading" class="text-center">{{ $t('map.noFavorites') }}</div>

    <FavoritePlace
      v-for="place in props.places"
      :key="place.id"
      :title="place.title"
      :description="place.description"
      :img="place.img"
      :isActive="place.id === props.activeId"
      @click="emit('place-clicked', place.id)"
      @edit="handleEditPlace(place.id)"
      @delete="handleOpenConfirmationModal(place.id)"
    />

    <EditPlaceModal
      :is-open="isEditOpen"
      :place="selectedPlace"
      :isLoading="isUpdateLoading"
      @close="closeEditModal"
      @submit="handleSubmit"
    />

    <ConfirmationModal
      :title="$t('map.deletePlaceModal.title')"
      :is-open="isConfirmationModalOpen"
      :isLoading="isDeleteLoading"
      :is-error="deleteError"
      @cancel="closeConfirmationModal"
      @confirm="handleDeletePlace"
    />

    <IButton class="mt-10 w-full" variant="gradient" @click="emit('create')">{{ $t('map.addPlaceBtn') }}</IButton>
  </div>
</template>

// Adding prop for dynamically receiving the list of markers. Each one is an array of objects. Based
on it we can render the list of markers and putting specific data of each of them by props "title",
"description" and "img" to the FavoritePlace component. Also adding "isActive" prop to check if
marker is active or not. Clicking on the element should emit "place-clicked" event with id of the
clicked place to App component, where we will update "activeId" by id of the clicked place and
gather its coordinates.

// "create" event is emitted to HomepageView component, where we will open
CreateNewPlaceModal component on clicking on this button. // Add EditPlaceModal component to render
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

// Add deleting logic to the
FavoritePlaces component. Add ConfirmationModal component to render the specific modal for
confirming the deleting of favorite place with states and functions. Click on the delete button in
FavoritePlace will cause an opening the modal window. At the same time id of the place will be
stored in ref (handleOpenConfirmationModal). Click on cancel button will close the modal window,
click on confirm button will call deletePlace function (with stored id of the place), which will
make an async call to the server to delete the place. After successful operation modal window will
be closed and ref for storaging the id of the deleted place will be cleared.
