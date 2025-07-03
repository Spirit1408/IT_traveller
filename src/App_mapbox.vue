<script setup>
import FavoritePlaces from './components/FavoritePlaces/FavoritePlaces.vue'
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapSettings } from './map/settings.js'
import MarkerIcon from './components/icons/MarkerIcon.vue'
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

// "activeId" - id of selected marker (0 by default). By props sending to MapBox component. By
clicking on marker button emitting "changeActiveId" event from MapBox with new id value and
executing update of "activeId". Then this value is going to FavoritePlaces component, where
condition of "isActive" prop is checking if id of place is equal to "activeId". According to it -
styles of the FavoritePlace component will be changed. Editing previous logic (markers) - clicking
on FavoritePlace should return id of the clicked place. In function "changePlace" we are changing
active marker id and getting coordinates of the place by filtering favoritePlaces array by received
id. On MapboxMap creating an instance of the map (for flying to the place by its coordinates) and
writes it to "map" variable. For readability i moved component "MapBox" to the App component and
delete dependencies of props. Clicking on place from the list will call "changePlace" function,
which will change active id (for marking the place as active), gathering the coordinates of the
clicked place and flying to it (as map became to be an interactive instance of the map - it has a
method "flyTo", which receives an object with coordinates).
