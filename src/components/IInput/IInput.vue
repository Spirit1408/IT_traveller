<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    default: 'text',
    type: String,
    validator: (value) => ['text', 'email', 'password'].includes(value),
  },
})

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="w-full text-[#2C2C2C]">
    <label class="block">
      <span class="block text-xs px-3 mb-2">{{ props.label }}</span>

      <input
        class="w-full text-sm rounded-[4px] border-[#eaeaea] border-[1px] py-2 px-3 focus:outline-primary"
        v-bind="{ ...$props, ...$attrs }"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      />
    </label>
  </div>
</template>

// update:modelValue - we are defining a custom event (update) and data (modelValue), which will be
senden from the input component to the parent component (form). It's a declared name (description)
of this event. "modelName" - name of the prop, part of v-model. "update:modelName" - name of the
event (also part of v-model). And also we are making the input controllable - value of the input
will be taken from the parent component (form), updated in event "input" by using actual data from
the input, and senden to the parent component using "emit". V-model helps to send data in two ways -
from parent to child and from child to parent component. From parent - value dy default, initally,
and from child to parent - an updated value. In "emit" we are making declaration - result of which
event will be senden back. modelValue - name of the prop, part of v-model, by which we are receiving
data from the parent component.
