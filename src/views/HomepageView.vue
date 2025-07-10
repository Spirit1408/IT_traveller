<script setup>
import FavoritePlaces from '../components/FavoritePlaces/FavoritePlaces.vue'
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapSettings } from '../map/settings.js'
import MarkerIcon from '../components/icons/MarkerIcon.vue'
import { computed, onMounted, ref } from 'vue'
import { addFavoritePlace, getFavoritePlaces } from '@/api/favorite-places'
import { useModal } from '@/composables/useModal'
import CreateNewPlaceModal from '@/components/CreateNewPlaceModal/CreateNewPlaceModal.vue'
import { useMutation } from '@/composables/useMutation'

const { style, apiToken } = mapSettings

const activeId = ref(null)
const map = ref(null)
const mapMarkerLngLat = ref(null)
const { isOpen, openModal, closeModal } = useModal()

const { mutation: getPlaces, data } = useMutation({
  mutationFn: () => getFavoritePlaces(),
})

const favoritePlaces = computed(() => data.value ?? [])

const {
  mutation: addPlace,
  isLoading: isAddingPlace,
  error,
} = useMutation({
  mutationFn: (newPlaceData) => addFavoritePlace(newPlaceData),
  onSuccess: () => {
    closeModal()
    mapMarkerLngLat.value = null
    getPlaces()
  },
})

const changeActiveId = (id) => {
  activeId.value = id
}

const changePlace = (id) => {
  const { coordinates } = favoritePlaces.value.find((place) => place.id === id)
  changeActiveId(id)
  map.value.flyTo({ center: coordinates })
}

const handleMapClick = ({ lngLat }) => {
  if (
    mapMarkerLngLat.value &&
    mapMarkerLngLat.value[0] === lngLat.lng &&
    mapMarkerLngLat.value[1] === lngLat.lat
  ) {
    return (mapMarkerLngLat.value = null)
  }

  mapMarkerLngLat.value = [lngLat.lng, lngLat.lat]
}

const handleAddPlace = async (formData, resetForm) => {
  const body = {
    ...formData,
    coordinates: mapMarkerLngLat.value,
  }

  await addPlace(body)

  resetForm()
}

onMounted(() => {
  getPlaces()
})
</script>

<template>
  <main class="flex h-screen">
    <div class="bg-white h-full w-[400px] shrink-0 overflow-auto pb-10">
      <FavoritePlaces
        :places="favoritePlaces"
        :active-id="activeId"
        @place-clicked="changePlace"
        @create="openModal"
        @updated="getPlaces"
      />

      <CreateNewPlaceModal
        :is-open="isOpen"
        @close="closeModal"
        @submit="handleAddPlace"
        :is-loading="isAddingPlace"
        :has-error="error"
      />
    </div>

    <div class="w-full h-full flex items-center justify-center text-6xl">
      <MapboxMap
        class="w-full h-full"
        :access-token="apiToken"
        :map-style="style"
        :center="[-38.94825316249595, -15.683918784057834]"
        :zoom="13"
        @mb-created="(mapInstance) => (map = mapInstance)"
        @mb-click="handleMapClick"
      >
        <MapboxMarker v-if="mapMarkerLngLat" :lngLat="mapMarkerLngLat" anchor="bottom">
          <MarkerIcon class="h-8 w-8" />
        </MapboxMarker>

        <MapboxMarker
          v-for="place in favoritePlaces"
          :key="place.id"
          :lngLat="place.coordinates"
          anchor="bottom"
        >
          <button @click.stop="changeActiveId(place.id)">
            <MarkerIcon class="h-8 w-8" :isActive="place.id !== activeId" />
          </button>
        </MapboxMarker>
      </MapboxMap>
    </div>
  </main>
</template>

// Adding modal component (for adding an information about new favorite place). Gathering ref and
methods from composable for open and close modal actions. Using CreateNewPlaceModal component in
template to render the specific modal for adding new favorite place.

// Using useMutation composable
for adding new favorite place action (sending data to the server). Will accept a function for
asyncronous sending new favorite place (received from submit in CreateNewPlaceModal component). But
before - data should be sent in a proper format. In handleAddPlace function - receiving data from
CreateNewPlaceModal component and forming a body for sending to the server by addPlace function
(adding coordinates, stored in mapMarkerLngLat, to the body). AddPlace - function from useMutation,
receives function for sending data to the server, make her asyncronous and while calling - receiving
formed data from handleAddPlace and sending it to the inner asyncronous function (addFavoritePlace).
And then, after receiving response from the server, adding new favorite place to favoritePlaces
array, closing the modal and resetting the mapMarkerLngLat ref (for removing custom marker - to
prevent adding new place to the same coordinates).

// Adding reactivity to the button in
CreateNewPlaceModal component (for showing loading state while sending data to the server). Adding
error handling in CreateNewPlaceModal component (for displaying error message if exists, f.e. marker
wasn't set before submit - no coordinates data is going to the server).

// Should pay attention to
the names and types of the properties, received from the server. For example - was "id" with type
"Number" (static data of favorite places) - now "_id" with type "String" (from server).

// From
CreateNewPlaceModal component emitting event "submit" with data and function for resetting the form
- adding resetForm function to reset form after submit (should be sent to handler as an argument).
In this case handler also should be an asyncronous function - for await the response and after clear
the form inputs.

// To add reactivity after adding/updating or removing favorite place - instead of
using onMounted() to write data to the favoritePlaces as in a ref, we will use composable function
getPlaces and data (ref from useMutation with gathered response from the server). Variable
favoritePlaces will be computed and dymaically updated, if response.data exists or will return an
ampty array, if response data doesn't exist or empty. After adding new favorite place (addPlace) -
function getPlaces should be called inside of onSuccess() function for updating favoritePlaces
reactively.

// Add click.stop to button to prevent propagation of the event to the parent element -
it prevents showing the custom marker when clicking on exisiting marker on the map.

// Add "updated" event to HomepageView component to update the list of favorite places after
successful updating the place.
