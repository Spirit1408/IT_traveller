<script setup>
import { ref } from 'vue'
import UploadIcon from '../icons/UploadIcon.vue'

const emit = defineEmits(['uploaded'])
const errorMessage = ref('')

const handleUploadImage = (e) => {
  const file = e.target.files[0]

  if (file.size > 3 * 1024 * 1024) {
    errorMessage.value = 'Файл повинен бути менше 3 МБ'
    return
  }

  const fileReader = new FileReader()

  fileReader.readAsDataURL(file)

  fileReader.onload = () => {
    errorMessage.value = ''
    emit('uploaded', fileReader.result)
  }
}
</script>

<template>
  <label class="cursor-pointer hover:text-primary">
    <input type="file" accept="image/*" class="hidden" @change="handleUploadImage" />

    <span class="flex items-center gap-1">
      <UploadIcon />

      <span class="underline text-xs">Натисніть тут, щоб додати фото</span>
    </span>
  </label>

  <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
</template>
// By @change we can add logic of image uploading to the element. Standard input will be hidden, but
clicking on the label will open the file selector. Visually it will be replaced by span with icon
and description (whos also are placed in the label element). By default in file will be storaging
file data in file format. To convert it to base64 format we can use FileReader. As it's an async
operation, we can use method ".onload" - it will be called when the operation of reading file data
will be finished. By using emit we can send data from the component to the parent component (Modal).
We can prevent upload of large files and show error message. Don't forget to rewrite errorMessage if
file size will be acceptable!
