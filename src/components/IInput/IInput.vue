<script setup>
import { ref } from 'vue'

const props = defineProps({ label: String })

const value = ref('')
</script>

<template>
  <div class="w-full text-[#2C2C2C]">
    <label
      class="block"
      @click.self.once="() => console.log('Label is clicked')"
      @keydown.alt.b="() => console.log('Label is clicked by pressing alt + b')"
    >
      <span class="block text-xs px-3 mb-2" @click.stop="() => console.log('Span is clicked')"
        >{{ props.label }}: {{ value }}</span
      >

      <input
        class="w-full text-sm rounded-[4px] border-[#eaeaea] border-[1px] py-2 px-3 focus:outline-primary"
        type="text"
        @focus="() => console.log('Input is focused')"
      />

      <a href="/" class="text-white" @click.prevent="() => console.log('Link is clicked')"
        >Click me</a
      >
    </label>
  </div>
</template>
// focus - an another example of using v-on directive. For adding some extra logic (prevention of
default behavior, etc) we can use ".prevent" property of the event and rewrites the behavior.
".stop" - for stopping propagation of the event (bubbling, which could call console.log from label
twice). ".self" - for isolating event from child elements (can be used in modals!). ".once" - for
adding event listener only once. ".keydown" - for adding event listener for keyboard events (key
name as a property). For combinations of keys we can use a chain, like "keydown.alt.b".
