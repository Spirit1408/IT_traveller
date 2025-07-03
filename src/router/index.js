import { createRouter, createWebHistory } from 'vue-router'

const GreetingView = () => import('../views/GreetingView.vue')
const AuthView = () => import('../views/AuthView.vue')
const HomepageView = () => import('../views/HomepageView.vue')
const LoginView = () => import('../views/LoginView.vue')
const RegistrationView = () => import('../views/RegistrationView.vue')

const routes = [
  { path: '/', component: GreetingView },
  { path: '/auth', component: AuthView, children: [
    { path: 'login', component: LoginView },
    { path: 'registration', component: RegistrationView },
  ], redirect: '/auth/login' },
  { path: '/map', component: HomepageView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// File for organizing routes. Array routes contains objects, each of them describes path of the route and contains component (note that we are importing components of the pages here and not in the App component), which will be rendered on this path. Router is an instance, which requires created history of routing (from where to where we are going by pages) and array of routes itself. Connecting this router in main.js file to our app. In App component using RouterView to get access to the pages.

// By default, all the components will be imported to here at once. For better optimization we can use lazy loading - importing components only when they will be needed using function, wich will return import() function for the component. In this way the component of the page will be imported only when it will be needed, because when entering on the page - route of this page will call not an imported component itself, but import of the component.

// history will help for navigation purposes (using arrows back and forward in the browser to go back and forward between visited pages).

// For adding nested routes adding children property to the route object of the parent route. Children property also will be an array of routes (now nested to the parent one). Rest of the syntax is the same. Note that in the path we are not using '/' at the beginning (analogy with nested routing in React).

// Note! If going to auth route we can receive a bug - none of the nested router will be rendered and going by navigation links will be impossible (nested paged doesn't exist in parent level). To prevent this bug we need to add "redirect" property with path of the first children route to the parent route - it will always redirect to the first nested route automatically when going to the parent route.
