<script setup>
import FavoritePlaces from '../components/FavoritePlaces/FavoritePlaces.vue'
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapSettings } from '../map/settings.js'
import MarkerIcon from '../components/icons/MarkerIcon.vue'
import { onMounted, ref } from 'vue'
import { getFavoritePlaces } from '@/api/favorite-places'

const { style, apiToken } = mapSettings

const favoritePlaces = ref([])
const activeId = ref(null)
const map = ref(null)
const mapMarkerLngLat = ref(null)

const changeActiveId = (id) => {
  activeId.value = id
}

const changePlace = (id) => {
  const { lngLat } = favoritePlaces.value.find((place) => place.id === id)
  changeActiveId(id)
  map.value.flyTo({ center: lngLat })
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

onMounted(async () => {
  const { data } = await getFavoritePlaces()
  favoritePlaces.value = data
})
</script>

<template>
  <main class="flex h-screen">
    <div class="bg-white h-full w-[400px] shrink-0 overflow-auto pb-10">
      <FavoritePlaces :places="favoritePlaces" :active-id="activeId" @place-clicked="changePlace" />
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
          :lngLat="place.lngLat"
          anchor="bottom"
        >
          <button @click="changeActiveId(place.id)">
            <MarkerIcon class="h-8 w-8" :isActive="place.id !== activeId" />
          </button>
        </MapboxMarker>
      </MapboxMap>
    </div>
  </main>
</template>

// Implementing feature of addin a marker on the map. Adding custom marker in Mapbox, which will be
shown just if marker is setted (has its coordinates). Adding event mb-click to get coordinates of
the marker while clicking somewhere on the map, through the handler. While clicking on the map -
coordinates from the click event will be stored in "mapMarkerLngLat" variable. What will cause
showing our custom marker element on the map. Why using handler? Because lngLat stored in object in
event, we need to get the coordinates and put them to the array, which will be stored in
"mapMarkerLngLat", value of which (array) will be passed to MapboxMarker prop lngLat. Clicking on
the marker with the same coordinates will remove the marker. Anchor: "bottom" - marker will be shown
above the cursor while setting (centered to the cursos by default).
