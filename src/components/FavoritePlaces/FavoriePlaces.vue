<script setup>
import IButton from '../IButton/IButton.vue'
import { ref } from 'vue'

const counter = ref(0) // {value: 0}
const user = ref({ name: 'John', age: 30 }) // {name: 'John', age: 30}

const increment = () => {
  counter.value++
}

const changeUserName = () => {
  user.value.name = 'Harry Potter'
  user.value.age = 15
}
</script>
// ref - reactive variable (object with one property - "value"), with default value. Can be used for
data binding from HTML elements (and for other purposes). Achieving the value from ref variable is
possible by using .value property of the ref object.

<template>
  <div class="px-6">
    <div class="text-gray">User name: {{ user.name }}. Age: {{ user.age }} y.o.</div>

    <div class="text-gray mb-4">Додані маркери ({{ counter }})</div>

    <slot name="list"></slot>

    <IButton class="mt-10 w-full" @click="increment">Додати маркер</IButton>
    <IButton class="mt-10 w-full" @click="changeUserName">Change name</IButton>
  </div>
</template>
// Using ref variable to count number of added markers. Counter will be displayed inside of the
label. @click - directive for adding click event listener to the button. For gathering data from
script we can use double curly braces {{ variable }}. In template counter (as it`s a referral
object) will be "unpacked" to its value. Note that even variable "user" - an object with one
property "value", value of which is an object with user's data!
