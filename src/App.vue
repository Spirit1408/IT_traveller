<script setup>
import AuthView from './views/AuthView.vue';
import GreetingView from './views/GreetingView.vue';
import HomepageView from './views/HomepageView.vue';

</script>

<template>
  <GreetingView />
  <HomepageView />
  <AuthView />
</template>

// Moving everythig from App to HomepageView with correction of import paths. From now on App
component will be used for routing. Will have three pages: Greeting, Homepage and Auth.
