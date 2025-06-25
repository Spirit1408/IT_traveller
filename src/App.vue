<script setup>
import HomePageView from './views/HomepageView.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const fruits = ['kiwi', 'apple', 'banana']
const fruitsMap = {
  kiwi: 'Super kiwi',
  apple: 'Super apple',
  banana: 'Super banana',
}

const isTablet = ref(window.innerWidth > 768)

const handleResize = () => {
  isTablet.value = window.innerWidth > 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <ul>
    <li v-for="(fruit, index) in fruits" :key="fruit">
      <span class="w-2 h-2 bg-red-600 rounded-full inline-block" v-if="fruit === 'apple'" />
      <span class="w-2 h-2 bg-green-600 rounded-full inline-block" v-else-if="fruit === 'kiwi'" />
      <span class="w-2 h-2 bg-yellow-600 rounded-full inline-block" v-else />
      {{ fruit }} - {{ index + 1 }}
      <p class="inline-block ml-[-4px]">
        <span v-if="index + 1 == 1">st</span>
        <span v-else-if="index + 1 == 2">nd</span>
        <span v-else>rd</span>
        fruit
      </p>
    </li>
  </ul>

  <ul>
    <li v-for="(fruit, key) in fruitsMap" :key="fruit">
      {{ key[0].toUpperCase() + key.slice(1) }}: {{ fruit }}
    </li>
  </ul>

  <ul>
    <li v-for="number in 5" :key="number">{{ number }}</li>
  </ul>

  <ul v-if="isTablet">
    <li v-for="letter in 'hello'" :key="letter">{{ letter }}</li>
  </ul>

  <HomePageView />
</template>
// Cycle v-for using for iteration through iterable objects. Can be used for lists, sets, maps and
objects. To create a list in this example we should use this syntax not in the parent element (ul),
but in the element, which will be rendered (li). For example - using v-for in div element will
iterate object and render divs with value for each item. V-for accepts 2 parameters (item (possible
with index) and array of items) and :key - unique identificator of each item. By default v-for will
render all VALUES from iterable object. To render keys we can add them as a second parameter to
item. Can use v-for in each iterable elements, such as arrays, strings, maps, numbers and objects!
V-if and v-for can`t be used in the same element!
