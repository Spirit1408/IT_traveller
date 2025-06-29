<script setup>
import { ref } from 'vue'

const props = defineProps({ label: String })

const text = ref('')

const changeText = (event) => {
  text.value = event.target.value
}
</script>

<template>
  <div class="w-full text-[#2C2C2C]">
    <label class="block">
      <span class="block text-xs px-3 mb-2">{{ props.label }}: {{ text }}</span>

      <input
        class="w-full text-sm rounded-[4px] border-[#eaeaea] border-[1px] py-2 px-3 focus:outline-primary"
        type="text"
        @input="changeText"
      />

      <a href="/" class="text-white">Click me</a>
    </label>
  </div>
</template>
// Adding state "text" for storaging input data. Defining function for updating our state. Using
directive v-on:input for listening input event and updating state by using function "changeText".
Inputted text will be reflected inside of the label.
