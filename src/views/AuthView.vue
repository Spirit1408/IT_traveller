<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <BaseLayout>
    <section class="w-full p-10 bg-white rounded-2xl">
      <div class="flex justify-center gap-11 mb-10">
        <RouterLink to="registration" class="text-gray" exact-active-class="text-primary"
          >Створити акаунт</RouterLink
        >

        <RouterLink to="login" class="text-gray" exact-active-class="text-primary"
          >Увійти</RouterLink
        >
      </div>

      <RouterView />
    </section>
  </BaseLayout>
</template>

// Page for login and registration forms. Will be used nested routing here, to dynamically render
login or registration form with navigation elements above - switcher between login and registration
components. Using nested routing here by adding RouterView in the layout for rendering login or
registration form there (depending on the actual route). To add a navigation between pages we can
use RouterLink components with attribute 'to', which requires path to the page. Note that in case of
nested routes we don't need to use '/' in the path. To add active class to the link, we can use
attrubite exact-active-class of RouterLink element.
