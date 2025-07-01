<script setup>
import FavoritePlaces from './components/FavoritePlaces/FavoritePlaces.vue'
import MapBox from './components/MapBox/MapBox.vue'

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
</script>

<template>
  <main class="flex h-screen">
    <div class="bg-white h-full w-[400px] shrink-0 overflow-auto pb-10">
      <FavoritePlaces :places="favoritePlaces" />
    </div>

    <div class="w-full h-full flex items-center justify-center text-6xl">
      <MapBox :places="favoritePlaces" />
    </div>
  </main>
</template>
