import { useAuthStore } from '@store/auth.store'

function http() {
  const BASE_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

  async function request(
    endpoint: string,
    options: RequestInit = {},
    retries = 3
  ): Promise<any> {
    const { token } = useAuthStore.getState()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    }

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        if ([401, 403].includes(response.status)) retries = 0
        throw new Error(data.message || 'An error occurred')
      }

      return data
    } catch (error) {
      if (retries > 0) {
        console.warn(
          `Request failed, retrying... (${retries} attempts left)`,
          error
        )
        return request(endpoint, options, retries - 1)
      }

      console.error('Request failed after retries:', error)
      throw error
    }
  }

  return {
    get: (endpoint: string) => request(endpoint, { method: 'GET' }),
    post: (endpoint: string, body: any) =>
      request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint: string, body: any) =>
      request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint: string) => request(endpoint, { method: 'DELETE' }),
  }
}

export default http()
