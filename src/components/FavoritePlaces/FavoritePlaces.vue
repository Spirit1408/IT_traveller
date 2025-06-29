<script setup>
import IButton from '../IButton/IButton.vue'
import IInput from '../IInput/IInput.vue'
import { ref } from 'vue'

const buttonType = ref('gradient')

const changeBtnType = () => {
  buttonType.value = buttonType.value === 'gradient' ? 'primary' : 'gradient'
}
</script>

<template>
  <div class="px-6">
    <div class="text-gray mb-4">Додані маркери</div>

    <div class="py-5">
      <IInput label="Some label" />
    </div>

    <slot name="list"></slot>

    <IButton class="mt-10 w-full" :variant="buttonType" @click="changeBtnType"
      >Додати маркер</IButton
    >
  </div>
</template>
// Example of operating with events. Added some input component. @click - syntax sugar for
v-on:click.
