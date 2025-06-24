<script setup>
import IButton from './components/IButton/IButton.vue' // Using setup - importing components by default (non-named {} imports)

const classes = {
  'bg-black': true,
  'btn-red': true,
}
</script>
// Importing components (and other code) from files here

<template>
  <span class="btn m-5 p-2 inline-block bg-red-600 text-black">Hello, span!</span>
  <div>Hello, Vue <IButton :class="classes" /></div>
</template>
// HTML template for current (main) component. We can use other components here. Using inline
Tailwind styles (in rems when numbers are used!). Using dynamic classes (:class)

<style scoped>
.btn-red {
  color: red;
}

.bg-black {
  background-color: black;
}
</style>
