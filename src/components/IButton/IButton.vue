<template>
  <button
    class="btn bg-[#ffa270] rounded-xl py-[14px] px-10 text-white font-bold -tracking-wider hover:bg-[#ffb58d] duration-300 ease-in-out"
  >
    <div v-if="!$slots.default">No default content</div>
    <slot>Template of the button text</slot>
  </button>
</template>
// Using default slot (in IButton, analog "children" in React) provides possibily to use specific
content inside of the component with slot. In current example text of the button will be rendered
inside of the IButton component, inside of the slot tags. In the slot tag we can also add some
content, which will be seing just if there is no content between IButton tags. By using condition we
can check if we are using template text in the slot, or default value, which we can put to the
IButton component ("Почати роботу", in this case $slots.default will be true).
