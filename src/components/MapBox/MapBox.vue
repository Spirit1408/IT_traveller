<script setup>
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapSettings } from '../../map/settings.js'
import MarkerIcon from '../icons/MarkerIcon.vue'

const { style, apiToken } = mapSettings

const props = defineProps({
  places: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <MapboxMap
    class="w-full h-full"
    :access-token="apiToken"
    :map-style="style"
    :center="[-38.94825316249595, -15.683918784057834]"
    :zoom="13"
  >
    <MapboxMarker v-for="place in props.places" :key="place.id" :lngLat="place.lngLat">
      <MarkerIcon class="h-8 w-8" />
    </MapboxMarker>
  </MapboxMap>
</template>

// Connecting Mapbox to our project. Mapbox requires styles and access token to properly connect to
the server. Putting this data dynamically (from settings.js). Also reccomended to hide access token
from publishing on repository. Attribute "center" is a starting point of the map. "Zoom" - to set
the starting zoom level (whole map by default). Adding props to render markers from the list of
favorite places. MapboxMarker can receive props "lngLat" to render markers on the map by
coordinates, and having default slot to render custom icons.
