import { useToast } from '@/tools/toast'

const toast = useToast()

export function fetchWithTimeout(url: string, options = {}, timeout = 5000): Promise<Response> {
  const controller = new AbortController()
  const signal = controller.signal

  const timeoutId = setTimeout(() => controller.abort(), timeout)
  return fetch(url, { ...options, signal }).then(response => {
    clearTimeout(timeoutId)
    return response
  }).catch(error => {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out')
    } else {
      toast.showError(error.statusText)
    }
    throw error
  })
}