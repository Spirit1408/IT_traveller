import { createRouter, createWebHistory } from 'vue-router'
import GreetingView from '@/views/GreetingView.vue'
import AuthView from '@/views/AuthView.vue'
import HomepageView from '@/views/HomepageView.vue'

const routes = [
  { path: '/', component: GreetingView },
  { path: '/auth', component: AuthView },
  { path: '/map', component: HomepageView }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// File for organizing routes. Array routes contains objects, each of them describes path of the route and contains component (note that we are importing components of the pages here and not in the App component), which will be rendered on this path. Router is an instance, which requires created history of routing (from where to where we are going by pages) and array of routes itself. Connecting this router in main.js file to our app. In App component using RouterView to get access to the pages.
