<script setup>
import HomePageView from './views/HomepageView.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const isDesktop = ref(window.innerWidth > 1024)
const isTablet = ref(window.innerWidth > 768 && window.innerWidth <= 1024)

const handleResize = () => {
  isDesktop.value = window.innerWidth > 1024
  isTablet.value = window.innerWidth > 768 && window.innerWidth <= 1024
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <template v-if="isDesktop"><HomePageView /></template>

  <template v-else-if="isTablet"><div>This is tablet</div></template>

  <template v-else><div class="text-red-600">This is mobile</div></template>

  <div v-show="!isDesktop && !isTablet" class="text-green-600">
    This is hidden element in all cases except mobile
  </div>
</template>
// v-if directive using for conditional rendering. If condition is true - component will be
rendered. Added reactivity using ref, mounted and unmounted hooks. Everytime while window is resized
- handleResize function will be called (to check if window width is greater than 1024px etc). If not
- isDesktop will be false and component will not be rendered. Can use additional rendering
conditions using v-else-if with different condition. v-else - for condition, which is not described
in pervious ones. Important that v-if, v-else-if and v-else should be neighbours in template! Inner
template can work as a Fragment from React - to group several components together without using
extra divs. By using templates we can get a better visualization of the conditional logic (but in
this case, as we spoke before, we should use v-conditions directly in templates - neighbours of each
other on the same first level of hierarchy). V-show - to show/hide elements without rendering them
(display:none) according to the condition. Should be used only in elements, but never being used in
templates! Another rule that should be followed: v-if, v-else-if and v-else should be neighbours
without any other elements in between!
