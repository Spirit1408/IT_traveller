<script setup>
import IButton from '../IButton/IButton.vue'
import IModal from '../IModal/IModal.vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isError: {
    type: Object,
    default: null,
  }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <IModal v-if="props.isOpen" @close="emit('cancel')">
    <div class="mb-4 text-lg">{{ props.title }}</div>

    <div class="flex gap-3 justify-center">
      <IButton @click="emit('cancel')" variant="cancel">{{ $t('map.deletePlaceModal.cancelButton') }}</IButton>

      <IButton variant="gradient" :is-loading="props.isLoading" @click="emit('confirm')">
        {{ $t('map.deletePlaceModal.submitButton') }}
      </IButton>
    </div>

    <div v-if="props.isError" class="text-red-500 mt-4">
      {{ $t('map.deletePlaceModal.errorSubmitButton') }}
    </div>
  </IModal>
</template>

// Modal for confirming a delete action. Click on the "confirm" button will emit "confirm" event and
click on the "cancel" button will emit "cancel" event. Adding "isLoading" and "isError" props to
handle loading (for confirm button) and error states. Closing the modal will emit "cancel" event, to Favorite places, where we will close the modal.
