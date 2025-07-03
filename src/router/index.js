import { createRouter, createWebHistory } from 'vue-router'

const GreetingView = () => import('../views/GreetingView.vue')
const AuthView = () => import('../views/AuthView.vue')
const HomepageView = () => import('../views/HomepageView.vue')

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

// By default, all the components will be imported to here at once. For better optimization we can use lazy loading - importing components only when they will be needed using function, wich will return import() function for the component. In this way the component of the page will be imported only when it will be needed, because when entering on the page - route of this page will call not an imported component itself, but import of the component.

// history will help for navigation purposes (using arrows back and forward in the browser to go back and forward between visited pages).
