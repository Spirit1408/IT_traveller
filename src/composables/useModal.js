import { ref } from 'vue'

export const useModal = () => {
  const isOpen = ref(false)

  const openModal = () => {
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
  }

  const toggleModal = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  }
}

// Composable function for modals logic. Instead of using state directly in the templates (and repeat the samelogic on each component), we can use this composable function.
