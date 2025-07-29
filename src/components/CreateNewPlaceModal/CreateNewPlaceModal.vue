<script setup>
import IModal from '../IModal/IModal.vue'
import IInput from '../IInput/IInput.vue'
import InputImage from '../InputImage/InputImage.vue'
import IButton from '../IButton/IButton.vue'
import MarkerIcon from '../icons/MarkerIcon.vue'
import { reactive } from 'vue'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean,
  },
  isLoading: {
    default: false,
    type: Boolean,
  },
  hasError: {
    default: null,
    type: Object,
  }
})

const emit = defineEmits(['submit', 'close'])

const formData = reactive({
  title: '',
  description: '',
  image: null,
})

const handleUpload = (url) => {
  formData.image = url
}

const resetForm = () => {
  formData.title = ''
  formData.description = ''
  formData.image = null
}
</script>

<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <form class="min-w-[420px]" @submit.prevent="(emit('submit', formData, resetForm))">
      <div class="font-bold flex gap-1 justify-center mb-10"><MarkerIcon />{{ $t('map.addPlaceModal.title') }}</div>

      <IInput :label="$t('map.addPlaceModal.name')" class="mb-4" v-model="formData.title" />

      <IInput
        type="textarea"
        :label="$t('map.addPlaceModal.description')"
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

        <InputImage @uploaded="handleUpload">{{ formData.image ? $t('map.addPlaceModal.changeImageButton') : $t('map.addPlaceModal.addImageButton') }}</InputImage>
      </div>

      <IButton class="w-full" variant="gradient" type="submit" :is-loading="props.isLoading">{{ $t('map.addPlaceModal.submitButton') }}</IButton>

      <div v-if="props.hasError" class="text-red-500 mt-2">{{ $t('map.common.errorSubmitButton') }}</div>
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

// Add resetting form data after successfull submit. In reactive object we should clear each field manually. Will be emitted tothe parent component and executed in handler.
