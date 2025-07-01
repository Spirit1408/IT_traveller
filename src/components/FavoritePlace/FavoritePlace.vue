<script setup>
import FavoritePlaceButton from './FavoritePlaceButton.vue'
import EditIcon from './EditIcon.vue'
import DeleteIcon from './DeleteIcon.vue'

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

const emit = defineEmits(['selected'])
</script>

<template>
  <section class="text-gray mb-6 last-of-type:mb-0" @click="emit('selected')">
    <div class="flex gap-4">
      <img class="w-[76px] h-[76px] shrink-0" :src="props.img" alt="" />

      <div class="flex-1">
        <div class="flex justify-between items-center mb-2">
          <h2 class="font-bold text-sm text-[#2c2c2c]">{{ props.title }}</h2>

          <div class="flex gap-2">
            <FavoritePlaceButton>
              <EditIcon />
            </FavoritePlaceButton>

            <FavoritePlaceButton>
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
place is active or not. Also adding click event for marking place as active, emitting "selected"
event to FavoritePlaces component.
