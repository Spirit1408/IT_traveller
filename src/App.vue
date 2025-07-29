<script setup>
import { RouterView } from 'vue-router'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher.vue'
</script>

<template>
  <RouterView />
  <LanguageSwitcher />
</template>

// Moving everything from App to HomepageView with correction of import paths. From now on App
component will be used for routing. Will have three pages: Greeting, Homepage and Auth, each of them
will be rendered in the router.
