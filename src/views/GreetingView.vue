<script setup>
import IButton from '../components/IButton/IButton.vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <div class="text-center">
      <img class="inline mb-6" src="../assets/img/map-pin.svg" alt="pin logo" />

      <h1 class="font-bold text-[38px] mb-7">{{ $t('greeting.title') }}</h1>

      <p class="leading-6 mb-11">{{ $t('greeting.description') }}</p>

      <IButton to="auth">{{ $t('greeting.startButton') }}</IButton>
    </div>
  </BaseLayout>
</template>
// In "views" folder storaging pages of the project. Text of the button will be rendered inside of
the button component, in a default slot.
