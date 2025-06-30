<script setup>
import { onMounted, onUnmounted, ref, Teleport } from 'vue'
import CrossIcon from '../icons/CrossIcon.vue'
import InputImage from '../InputImage/InputImage.vue'

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

const imageUrlBase64 = ref('')
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

        <img v-if="imageUrlBase64" :src="imageUrlBase64" alt="uploaded image" />

        <InputImage @uploaded="(base64) => (imageUrlBase64 = base64)" />

        <slot></slot>
      </div>
    </div>
  </component>
</template>

// Adding extra logic to work with uploaded images from InputImage component. When component
receiving data from InputImage - it will be stored in imageUrlBase64 variable. Using v-if directive
to display uploaded image only if imageUrlBase64 is not empty.
