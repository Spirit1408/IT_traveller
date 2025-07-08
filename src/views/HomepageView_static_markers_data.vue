<script setup>
import FavoritePlaces from '../components/FavoritePlaces/FavoritePlaces.vue'
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapSettings } from '../map/settings.js'
import MarkerIcon from '../components/icons/MarkerIcon.vue'
import { ref } from 'vue'

const { style, apiToken } = mapSettings

const favoritePlaces = [
  {
    id: 1,
    title: 'Home',
    description: 'Lovely place',
    img: '',
    lngLat: [35.000337443711736, 48.454519416090115],
  },
  {
    id: 2,
    title: 'Home 2',
    description: 'An another lovely place',
    img: '',
    lngLat: [31.4573491690504, 49.30636401450199],
  },
  {
    id: 3,
    title: 'Home 3',
    description: 'An another lovely place',
    img: '',
    lngLat: [-38.4476833924994, -12.991422329951817],
  },
]

const activeId = ref(null)
const map = ref(null)

const changeActiveId = (id) => {
  activeId.value = id
}

const changePlace = (id) => {
  const { lngLat } = favoritePlaces.find((place) => place.id === id)
  changeActiveId(id)
  map.value.flyTo({ center: lngLat })
}
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
