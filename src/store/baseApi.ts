import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      try {
        const token = typeof window !== 'undefined'
          ? (localStorage.getItem('access_token') ?? localStorage.getItem('token'))
          : null
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
      } catch (_e) {
        // ignore localStorage errors in SSR
      }
      return headers
    }
  }),
  tagTypes: ['User', 'Cart', 'Product', 'Category', 'Order', 'Promotion'],
  endpoints: () => ({}),
})
