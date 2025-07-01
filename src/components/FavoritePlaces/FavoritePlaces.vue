<script setup>
import IButton from '../IButton/IButton.vue'

const emit = defineEmits(['addMarker'])
</script>

<template>
  <div class="px-6">
    <div class="text-gray mb-4">Додані маркери</div>

    <slot name="list"></slot>

    <IButton class="mt-10 w-full" variant="gradient" @click="emit('addMarker')">Додати маркер</IButton>
  </div>
</template>
