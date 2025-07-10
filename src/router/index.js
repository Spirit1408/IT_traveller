import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '../api/authService'

const GreetingView = () => import('../views/GreetingView.vue')
const AuthView = () => import('../views/AuthView.vue')
const HomepageView = () => import('../views/HomepageView.vue')
const LoginView = () => import('../views/LoginView.vue')
const RegistrationView = () => import('../views/RegistrationView.vue')

const routes = [
  { path: '/', component: GreetingView, name: 'greeting' },
  {
    path: '/auth',
    component: AuthView,
    children: [
      { path: 'login', component: LoginView, name: 'login' },
      { path: 'registration', component: RegistrationView, name: 'registration' },
    ],
    redirect: '/auth/login',
  },
  { path: '/map', component: HomepageView, name: 'homepage' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authRoutes = ['login', 'registration']
  const { name } = to

  if (authService.isLoggedIn() && authRoutes.includes(name)) {
    next({ name: 'homepage' })
  } else if (!authRoutes.includes(name) && !authService.isLoggedIn()) {
    next({ name: 'login' })
  } else {
    next()
  }
})
// File for organizing routes. Array routes contains objects, each of them describes path of the route and contains component (note that we are importing components of the pages here and not in the App component), which will be rendered on this path. Router is an instance, which requires created history of routing (from where to where we are going by pages) and array of routes itself. Connecting this router in main.js file to our app. In App component using RouterView to get access to the pages.

// By default, all the components will be imported to here at once. For better optimization we can use lazy loading - importing components only when they will be needed using function, wich will return import() function for the component. In this way the component of the page will be imported only when it will be needed, because when entering on the page - route of this page will call not an imported component itself, but import of the component.

// history will help for navigation purposes (using arrows back and forward in the browser to go back and forward between visited pages).

// For adding nested routes adding children property to the route object of the parent route. Children property also will be an array of routes (now nested to the parent one). Rest of the syntax is the same. Note that in the path we are not using '/' at the beginning (analogy with nested routing in React).

// Note! If going to auth route we can receive a bug - none of the nested router will be rendered and going by navigation links will be impossible (nested paged doesn't exist in parent level). To prevent this bug we need to add "redirect" property with path of the first children route to the parent route - it will always redirect to the first nested route automatically when going to the parent route.

// Expanding our routing logic by adding before each hook, which will be executed before each route change. We can use this hook to check if user is authenticated and if not - redirect to the login page. Adding names to the routes to comfortably get an access to each route while checking the current one. Iside of it marking routes, which will be accessed without authorization.

// Logic is - we have an array of names, which allowed to access without authorization. From each route, on which we are going - we gathering name of this route and making a check: if name of the next route is not in the array of allowed routes and user is not authenticated - redirecting to the login page. Otherwise - going to the checked route. It prevents loading of the pages from restricted routes without authorization. If user is authenticated and trying to go to the login page - redirecting to the homepage.
