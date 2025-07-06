import { router } from '@/router'
import { clientFetch } from '../clientFetch'

export const TOKEN_KEY = 'token'

class AuthService {
  #token = null

  isLoggedIn() {
    return Boolean(this.#token)
  }

  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
    // clientFetch.defaults.headers.common['Authorization'] = `Bearer ${token}`
    this.#token = token
  }

  getToken() {
    return this.#token
  }

  clearToken() {
    localStorage.removeItem(TOKEN_KEY)
    // clientFetch.defaults.headers.common = {}
    this.#token = null
  }

  async login(body) {
    const { data } = await clientFetch.post('/user/login', body)
    const { accessToken } = data
    this.setToken(accessToken)
  }

  async registerUser(body) {
    const { data } = await clientFetch.post('/user/register', body)
    const { accessToken } = data
    this.setToken(accessToken)
  }

  async logout() {
    await clientFetch.get('/user/logout')
    this.clearToken()
  }

  async refresh() {
    const { data } = await clientFetch.get('/user/refresh')
    const { accessToken } = data
    this.setToken(accessToken)
  }
}

export const authService = new AuthService()

clientFetch.interceptors.request.use((request) => {
  const token = authService.getToken()
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }

  return request
})

clientFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorCode = error.response.status

    if (errorCode === 401) {
      try {
        return await authService.refresh()
      } catch (e) {
        router.push('/auth/login')
        return Promise.reject(e)
      }
    }

    return Promise.reject(error)
  },
)

// Class for working with authorization and registration of users (instead of using functions fro "user" folder). Storaging value of the token in private variable. Has four sync methods - isLoggedIn (check if token exists), setToken (set received value of the token to localStorage, header in axios instance and private variable (moved to interceptors)), clearToken (remove token from localStorage, header in axios instance and private variable (also moved to interceptors)) and getToken (get value of the token from private variable - using in interceptors). Async methods - login, registerUser, logout, refresh. All of them will be used with useMutation composable function for proper handling of the requests to the server and responses from it in components (RegisterView and LoginView).

//By axios interceptors we can update the logic to add refreshing on access token (which lives 15 minutes). After 15 minutes of open session - the token will be refreshed. Setting interceptor for requests - if token exists - add it to headers. Using interceptors for responses - if receiving response - returning it. If response returns error (second argument of the function) - gathering the error code. If error code is 401 - refreshing token. Or returning error (rejected in promise, as this function is asynchronous). Also adding error handler if refresh token is also corrupted (using try-catch for this scenario). For this senario (refresh token is invalid or expired) - we should move user to the login page. It can be done with router.push('/auth/login'). User automatically will be redirected to the login page if has problems with updating access token.
