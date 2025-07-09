<script setup>
import FavoritePlaceButton from './FavoritePlaceButton.vue'
import EditIcon from './EditIcon.vue'
import DeleteIcon from './DeleteIcon.vue'
import fallbackImage from '../../assets/img/ukraine.png'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: String,
  isActive: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <section class="text-gray mb-6 last-of-type:mb-0">
    <div class="flex gap-4">
      <img class="w-[76px] h-[76px] shrink-0 rounded-es-md" :src="props.img || fallbackImage" alt="" />

      <div class="flex-1">
        <div class="flex justify-between items-center mb-2">
          <h2 class="font-bold text-sm text-[#2c2c2c]">{{ props.title }}</h2>

          <div class="flex gap-2">
            <FavoritePlaceButton @click="emit('edit')">
              <EditIcon />
            </FavoritePlaceButton>

            <FavoritePlaceButton @click="emit('delete')">
              <DeleteIcon />
            </FavoritePlaceButton>
          </div>
        </div>

        <p class="text-xs line-clamp-3">
          {{ props.description }}
        </p>
      </div>
    </div>

    <div class="h-[1px] w-full mt-4" :class="props.isActive ? 'bg-primary' : 'bg-[#ececec]'"></div>
  </section>
</template>

// Dynamically rendering component with the specific data, received from props. Checking if the
place is active or not. Note, that not neccesarily to emit click event from here (as was done in the
previous verion (markers)) - we can emit click event with place id from FavoritePlaces component!

// Adding emits of functions for editing and deleting favorite place when clicking on the edit and
delete buttons respectively.
