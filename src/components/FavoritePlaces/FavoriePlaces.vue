<script setup>
import IButton from '../IButton/IButton.vue'
</script>

<template>
  <div class="px-6">
    <div class="text-gray mb-4">Додані маркери</div>

    <slot name="list"></slot>

    <IButton class="mt-10 w-full">Додати маркер</IButton>
  </div>
</template>
// Using v-for directive to render FavoritePlace component 4 times (in App.vue). Also can use v-slot (or #) to
create named slots in components. Tag 'slot' will have attribute 'name', to which we will refer
while adding extra elements to the component. Adding extra elements to the component will be
possible by using template with v-slot (or just #{name}) directive.
