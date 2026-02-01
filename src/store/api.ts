import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      try {
        const token =
          typeof window !== 'undefined'
            ? (localStorage.getItem('access_token') ?? localStorage.getItem('token'))
            : null;

        if (token) headers.set('Authorization', `Bearer ${token}`);
      } catch {
        // ignore
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<
      { access_token: string; refresh_token: string; token_type: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/api/v1/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    me: build.query<unknown, void>({
      query: () => ({ url: '/api/v1/me' }),
    }),
  }),
});

export const { useLoginMutation, useMeQuery } = api;
