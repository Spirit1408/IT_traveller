<script setup>
import { useLocale } from '@/composables/useLocale'

const { currentLocale, setLocale, isLocaleActive } = useLocale()

const changeLang = () => {
  const newLocale = currentLocale.value === 'en' ? 'ua' : 'en'
  setLocale(newLocale)
}
</script>

<template>
  <button
    class="fixed bottom-6 left-6 z-50 flex bg-white rounded-full shadow-lg overflow-hidden backdrop-blur-sm px-2 py-1 text-black"
    @click="changeLang"
  >
    <div class="flex gap-2 z-10 text-gray">
      <span
        :class="isLocaleActive('en') ? 'text-black' : 'text-gray'"
        class="transition-all duration-300"
        >En</span
      >
      <span
        :class="isLocaleActive('ua') ? 'text-black' : 'text-gray'"
        class="transition-all duration-300"
        >Ua</span
      >
    </div>
    <span
      class="w-[40%] h-[80%] rounded-full bg-primary absolute top-1/2 -translate-y-1/2 left-1 transition-all duration-300"
      :class="isLocaleActive('ua') && 'translate-x-7'"
    />
  </button>
</template>
