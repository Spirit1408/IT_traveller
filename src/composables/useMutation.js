import { ref } from 'vue'

export const useMutation = ({ mutationFn, onSuccess, onError }) => {
  const data = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const mutation = async (...args) => {
    isLoading.value = true

    try {
      error.value = null
      data.value = await mutationFn(...args)
      onSuccess?.(data)
    } catch (e) {
      error.value = e
      onError?.(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    isLoading,
    error,
    mutation,
  }
}

// Function has three constants: data (which will be received from the server), isLoading (for showing loading notification in the button), error (for error handling) and mutation (for sending data to the server and handling response). Inner function accepts any number of arguments (credentials), which will be sent to the mutation function. The rest - is analogy to our handlers in LoginView and RegistrationView. Calling the mutation function will switch isLoading value to true, then send data to the server by received mutation function (login or registerUser with credentials), receiving the response and making extra logic (routing in onSuccess), then catch error (if exists any) and switch isLoading value to false.
