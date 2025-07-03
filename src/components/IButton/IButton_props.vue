<script setup>
const props = defineProps({
  variant: {
    default: 'primary',
    type: String,
    required: true,
    validator: (value) => ['primary', 'gradient'].includes(value),
  },
}) // Declaration of the props with name "variant" for the component IButton, taking just a string values and should be required. Using default value "primary" if there is no value for the prop, and validator for checking if the value is "primary" or "gradient" (from array of possible values).
const bgStyles =
  props.variant === 'gradient' ? 'bg-gradient-to-r from-[#FFA279] to-[#F3743D]' : 'bg-[#FFA270]' // class of the button, which will be applied depending on the value of the variant prop
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
Recommended to use with validator, to check if the value of te prop is permitted.
