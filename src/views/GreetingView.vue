<script setup>
import IButton from '../components/IButton/IButton.vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <img class="inline mb-6" src="../assets/img/map-pin.svg" alt="pin logo" />

    <h1 class="font-bold text-[38px] mb-7">IT traveler</h1>

    <p class="leading-6 mb-11">
      Простий і зручний веб-додаток, який дозволить тобі відмічати твої улюблені місця, а також ті,
      в яких би ти дуже хотів побувати. Тож не зволікай та спробуй сам.
    </p>

    <IButton>Почати роботу</IButton>
  </BaseLayout>
</template>
// In "views" folder storaging pages of the project. Text of the button will be rendered inside of
the button component, in a default slot.
