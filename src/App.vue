<script setup>
import FavoritePlaces from './components/FavoritePlaces/FavoritePlaces.vue'
import MapBox from './components/MapBox/MapBox.vue'
import { ref } from 'vue'

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

const changeActiveId = (id) => {
  activeId.value = id
}
</script>

<template>
  <main class="flex h-screen">
    <div class="bg-white h-full w-[400px] shrink-0 overflow-auto pb-10">
      <FavoritePlaces :places="favoritePlaces" :active-id="activeId" @selected="changeActiveId" />
    </div>

    <div class="w-full h-full flex items-center justify-center text-6xl">
      <MapBox :places="favoritePlaces" :active-id="activeId" @change-active-id="changeActiveId" />
    </div>
  </main>
</template>

// "activeId" - id of selected marker (0 by default). By props sending to MapBox component. By
clicking on marker button emitting "changeActiveId" event from MapBox with new id value and
executing update of "activeId". Then this value is going to FavoritePlaces component, where
condition of "isActive" prop is checking if id of place is equal to "activeId". According to it - styles of the FavoritePlace
component will be changed. Also from FavoritePlaces component we are emitting event "selected" with id of selected place from the list. This action also will change "activeId". Idea is the same - click on FavoritePlace or Marker
