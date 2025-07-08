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

const changeActiveId = (id) => {
  activeId.value = id
}

const changePlace = (id) => {
  const { lngLat } = favoritePlaces.value.find((place) => place.id === id)
  changeActiveId(id)
  map.value.flyTo({ center: lngLat })
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
      >
        <MapboxMarker v-for="place in favoritePlaces" :key="place.id" :lngLat="place.lngLat">
          <button @click="changeActiveId(place.id)">
            <MarkerIcon class="h-8 w-8" :isActive="place.id !== activeId" />
          </button>
        </MapboxMarker>
      </MapboxMap>
    </div>
  </main>
</template>

// First steps of fetching data "favorite places" from API by "onMounted" hook (analogy to
"useEffect" in React). Instead of static data we are fetching it from the API and store it in
"favoritePlaces" variable (which is a referential, dynamic, object now).
