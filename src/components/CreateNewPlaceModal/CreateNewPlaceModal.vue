<script setup>
import IModal from '../IModal/IModal.vue'
import IInput from '../IInput/IInput.vue'
import InputImage from '../InputImage/InputImage.vue'
import IButton from '../IButton/IButton.vue'
import MarkerIcon from '../icons/MarkerIcon.vue'
import { computed, onUnmounted, reactive, toRaw } from 'vue'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean,
  },
})

const emit = defineEmits(['close', 'submit'])

const formData = reactive({
  title: '',
  description: '',
  image: null,
})

const handleUpload = (url) => {
  formData.image = url
}

const uploadText = computed(() => {
  return formData.image ? 'Натисніть тут, щоб змінити фото' : 'Натисніть тут, щоб додати фото'
})

onUnmounted(() => {
  formData.title = ''
  formData.description = ''
  formData.image = null
})
</script>

<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <form class="min-w-[420px]" @submit.prevent="emit('submit', toRaw(formData))">
      <div class="font-bold flex gap-1 justify-center mb-10"><MarkerIcon />Додати маркер</div>

      <IInput label="Локація" class="mb-4" v-model="formData.title" />

      <IInput
        type="textarea"
        label="Опис"
        placeholder="Введіть текст"
        class="mb-2"
        v-model="formData.description"
      />

      <div class="flex items-center mb-10 gap-2">
        <img
          v-if="formData.image"
          :src="formData.image"
          alt="uploaded image"
          class="w-20 h-20 object-cover"
        />

        <InputImage @uploaded="handleUpload">{{ uploadText }}</InputImage>
      </div>

      <IButton class="w-full" variant="gradient" type="submit">Додати</IButton>
    </form>
  </IModal>
</template>
// Even if we won't use emit in this component (because it goes from IModal component) - emit here
to parent component (App) will be done automatically. But it's better to add emit here for better
readability of the code (better practice). Gathering data from the inputs using v-model to reactive
object and sending it to the parent component (and preventing default behaviour of the form
submitting). With image - different situation, because we receiving base64 string of the image via
uploaded event and then, through function, which receiving base64 string as an argument, adding data
to the reactive object. Reactive object converting to raw object and then sending it to the parent
component. If image is in formData - displaying it. Also changing text of the button depending on
the existence of the image in formData.
