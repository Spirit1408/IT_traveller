<script setup>
import MarkerIcon from '../icons/MarkerIcon.vue'
import IModal from '../IModal/IModal.vue'
import fallbackImage from '../../assets/img/ukraine.png'
import IInput from '../IInput/IInput.vue'
import IButton from '../IButton/IButton.vue'
import InputImage from '../InputImage/InputImage.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean,
  },
  isLoading: {
    default: false,
    type: Boolean,
  },
  place: {
    type: Object,
  },
})

const formData = ref({
  id: '',
  title: '',
  description: '',
  img: null,
  coordinates: null,
})

const emit = defineEmits(['close', 'submit'])

const handleChangeImg = (url) => {
  formData.value.img = url
}

watch(
  () => props.place,
  () => {
    formData.value = { ...props.place }
  },
)
</script>

<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <div class="w-[750px]">
      <div class="flex gap-2 items-center mb-10">
        <MarkerIcon height="18" width="18" />

        <span class="font-bold text-base">Редагувати маркер</span>
      </div>

      <form @submit.prevent="emit('submit', formData)">
        <div class="flex gap-5">
          <div class="w-5/12">
            <img
              class="w-full h-[276px] object-cover rounded-md"
              :src="formData.img || fallbackImage"
              alt="place img"
            />
          </div>

          <div class="w-7/12">
            <IInput label="Локація" v-model="formData.title" />

            <div class="mt-4">
              <IInput label="Опис" type="textarea" v-model="formData.description" />
            </div>

            <IButton class="mt-10 w-full" variant="gradient" :is-loading="props.isLoading">Зберегти</IButton>
          </div>
        </div>

        <InputImage class="mt-3" @uploaded="handleChangeImg">
          <span class="text-xs"> Натисніть тут, щоб обрати інше фото</span>
        </InputImage>
      </form>
    </div>
  </IModal>
</template>

// Modal for editing the favorite place. Using v-modal to gather the data from the form to formData
ref and send it to the server. To recieve the current data from the place (to show in the form) -
can use watch(). First argument - function to obtain the place from the prop, second - function to
update the formData ref by current data from the place.

// Submit on form will emit "submit" event
with the updated data of the place from the form (do not forget to prevent the default behavior of
submit).
