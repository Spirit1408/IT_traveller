<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <BaseLayout><RouterView /></BaseLayout>
</template>

// Page for login and registration forms. Will be used nested routing here, to dynamically render
login or registration form with navigation elements above - switcher between login and registration
components. Using nested routing here by adding RouterView in the layout for rendering login or
registration form there (depending on the actual route).
