import './assets/main.css' // Import styles (general & specific, for main component)

import { createApp } from 'vue' // Import of function to create the app
import { createPinia } from 'pinia' // Import of Pinia (state manager, like Redux from React)
import App from './App.vue' // Import of the main component from file
import { router } from './router' // Import of created router
import { authService, TOKEN_KEY } from './api/authService' // Import of auth service

const token = localStorage.getItem(TOKEN_KEY) // Getting token from local storage
if (token) {
  authService.setToken(token)
} // If there is token in local storage - set it to auth service (class private variable and header of axios instance)

const app = createApp(App) // Creation of the app, based on the imported main component, which will be mounted in index.html

app.use(createPinia()) // Declaration of usage of Pinia states by app, creation of the Pinia instance at the same time

app.use(router) // Using created router with paths of the pages here

app.mount('#app') // Mounting of the app in specific div in index.html

