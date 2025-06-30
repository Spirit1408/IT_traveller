<script setup>
import { onMounted, onUnmounted, Teleport } from 'vue'
import CrossIcon from '../icons/CrossIcon.vue'

const emit = defineEmits(['close'])

onMounted(() => {
  document.body.style.overflow = 'hidden'

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      emit('close')
    }
  })
})

onUnmounted(() => {
  document.body.style.overflow = 'initial'

  document.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      emit('close')
    }
  })
})
</script>

<template>
  <component :is="Teleport" to="body">
    <div
      class="flex w-full h-full fixed top-0 left-0 overflow-auto bg-[rgba(0,0,0,0.3)]"
      @click.self="emit('close')"
    >
      <div class="relative bg-white min-w-[350px] m-auto text-black rounded-2xl p-10">
        <button>
          <CrossIcon class="absolute top-3 right-3 w-6 h-6" @click="emit('close')" />
        </button>

        <slot></slot>
      </div>
    </div>
  </component>
</template>
// Using emit for sending close event to the parent component, where the closing function will be
executed (changing isOpen state to false). When v-if (in parent component, where component will be
rendered) is true - hook onMounted will be called. If condition is false - hook onUnmount will be
called. We can add some extra logic to execute in this hooks. For example - add prevention of
scrolling when modal is opened (and recover ability to scroll when modal is closed). Teleport
provides ability to render component on a body level. Attribute to="body" means that component will
be rendered exactly in the body element, not on any specific element (like App). Remember that
".self" is listeting to click on the element itself, not on the children of the element. Adding
@keydown feature to the component allows to close the modal by pressing ESC, but won't work with div
(because it's not focusable). In this case we can use event listener when component is mounted (and
removed this event listener when component is unmounted). Using "component" tag to avoid error,
which we can see while using Teleport component itself (some bug).
