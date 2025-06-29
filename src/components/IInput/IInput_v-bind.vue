<script setup>
const props = defineProps({
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
</script>

<template>
  <div class="w-full text-[#2C2C2C]">
    <label class="block">
      <span class="block text-xs px-3 mb-2">{{ props.label }}</span>

      <input
        class="w-full text-sm rounded-[4px] border-[#eaeaea] border-[1px] py-2 px-3 focus:outline-primary"
        v-bind="{ ...$props, ...$attrs }"
      />
    </label>
  </div>
</template>

/* By default placeholders and types, which we can use in the input component from the parent
component, will be applied to the parent element of the input component (div). We can change this by
using props. This syntax will be applied to the input element: :placeholder="props.placeholder"
:type="props.type". Or we can just use v-bind (syntax sygar is ":") to apply all required props to
the input element (v-bind="$props"). To add attributes to the input element we can use
v-bind="$attrs". Better practice is to merge props and attrs by using syntax {...$props, ...$attrs}.
To prevent using attributes of input on the parent element we can use "defineOptions" function and
set inheritAttrs to false. It will prevent adding attributes to the parent element. The same will be
applied to events, which will be used not to the parent element, but directly to the input element
(because events are also a part of the attributes). */
