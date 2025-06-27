<script setup>
import IButton from '../IButton/IButton.vue'
import { ref, reactive } from 'vue'

const counter = ref(0) // {value: 0}
const user = ref({ name: 'John', age: 30 }) // {name: 'John', age: 30}
const superUser = reactive({ name: 'Super user', age: 1000 })

const increment = () => {
  counter.value++
}

const changeUserData = () => {
  user.value.name = 'Harry Potter'
  user.value.age = 15
}

const changeSuperUserName = () => {
  superUser.name = 'Super duper user'
  superUser.age = 2000
}
</script>
// ref - reactive variable (object with one property - "value"), with default value. Can be used for
data binding from HTML elements (and for other purposes). Achieving the value from ref variable is
possible by using .value property of the ref object.

<template>
  <div class="px-6">
    <div class="text-gray">User name: {{ user.name }}. Age: {{ user.age }} y.o.</div>
    <div class="text-gray">Superuser name: {{ superUser.name }}. Age: {{ superUser.age }} y.o.</div>

    <div class="text-gray mb-4">Додані маркери ({{ counter }})</div>

    <slot name="list"></slot>

    <IButton class="mt-10 w-full" @click="increment">Додати маркер</IButton>
    <IButton class="mt-10 w-full" @click="changeUserData">Change user data</IButton>
    <IButton class="mt-10 w-full" @click="changeSuperUserName">Change super user data</IButton>
  </div>
</template>
// Using ref variable to count number of added markers. Counter will be displayed inside of the
label. @click - directive for adding click event listener to the button. For gathering data from
script we can use double curly braces {{ variable }}. In template counter (as it`s a referral
object) will be "unpacked" to its value. Note that even variable "user" - an object with one
property "value", value of which is an object with user's data, wrapped in reactive function! Note
that in function with superUser object we aren't using "value" property to change its value, just
ordinary syntax of objects. But using refs is recommended, because of more flexibility and
reactivity. Usage of reactive can be good in forms.
