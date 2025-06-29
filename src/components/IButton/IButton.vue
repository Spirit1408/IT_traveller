<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  variant: {
    default: 'primary',
    type: String,
    required: false,
    validator: (value) => ['primary', 'gradient'].includes(value),
  },
})
const bgStyles = computed(() =>
  props.variant === 'gradient' ? 'bg-gradient-to-r from-[#FFA279] to-[#F3743D]' : 'bg-[#FFA270]',
)
</script>

<template>
  <button
    class="btn rounded-xl py-[14px] px-10 text-white font-bold -tracking-wider hover:bg-[#ffb58d] duration-300 ease-in-out"
    :class="bgStyles"
  >
    <slot></slot>
  </button>
</template>

// Using dynamic classes for the button to change the color of the background depending on the value
of the variant prop. Prop declared with some restrictions about it`s value - required and type.
Recommended to use with validator, to check if the value of te prop is permitted. "Computed" add
reactive changing of the styles (in this example) of the button depending on the value of the
variant prop.
