<script setup>
import IButton from '../IButton/IButton.vue'
import { ref } from 'vue'

const buttonType = ref('gradient')

const changeBtnType = () => {
  buttonType.value = buttonType.value === 'gradient' ? 'primary' : 'gradient'
}
</script>

<template>
  <div class="px-6">
    <div class="text-gray mb-4">Додані маркери</div>

    <slot name="list"></slot>

    <IButton class="mt-10 w-full" :variant="buttonType" @click="changeBtnType"
      >Додати маркер</IButton
    >
  </div>
</template>
// Dynamic data can be senden to props with "v-bind:variant="counter" syntax (or just ":" before the
name of the prop). Computed properties can be used for dynamic rendering of the component when
specific data is changed (Without it we won't see the changes of the button styles, for example).
Computed will be used in IButton component, for dynamic changing of the styles.
