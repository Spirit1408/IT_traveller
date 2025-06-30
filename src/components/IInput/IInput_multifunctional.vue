<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    default: 'text',
    type: String,
    validator: (value) => ['text', 'email', 'password', 'textarea'].includes(value),
  },
})

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits(['update:modelValue'])

const isTextarea = computed(() => props.type === 'textarea')

const baseStyles =
  'w-full text-sm rounded-[4px] border-[#eaeaea] border-[1px] py-2 px-3 focus:outline-primary'

const inputStyles = computed(() => (isTextarea.value ? baseStyles + ' resize-none' : baseStyles))
</script>

<template>
  <div class="w-full text-[#2C2C2C]">
    <label class="block">
      <span class="block text-xs px-3 mb-2">{{ props.label }}</span>

      <textarea
        rows="3"
        :class="inputStyles"
        v-bind="{ ...$props, ...$attrs }"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        v-if="isTextarea"
      >
      </textarea>

      <input
        :class="inputStyles"
        v-bind="{ ...$props, ...$attrs }"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        v-else
      />
    </label>
  </div>
</template>

// Adding state isTextarea to render another format of the component (will be used in modal
components). If IInput hasn't this prop, it will be rendered as our standard input. Similar logic to
styles - if the input is textarea, we are adding "resize-none" class to the input element, the rest
inputs will have standard baseStyles styles.
