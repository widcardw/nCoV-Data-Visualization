import { createFetch } from '@vueuse/core'

const useMyFetch = createFetch({
  baseUrl: 'http://localhost:3000/api',
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  },
})

export default useMyFetch
