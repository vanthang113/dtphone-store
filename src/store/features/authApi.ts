import { baseApi } from "../baseApi"
import { mockLoginResponse, mockUser } from "@/data/mockData"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

interface UserResponse {
  user_id: number
  full_name: string
  email: string
  phone: string
  gender?: string
  date_of_birth?: string
  avatar_url?: string
  status: string
  created_at: string
  updated_at: string
}

interface RegisterRequest {
  full_name: string
  email: string
  phone: string
  password: string
  gender?: string
  date_of_birth?: string
  avatar_url?: string
}

interface VerifyEmailRequest {
  email: string
  verification_code: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      async queryFn(_credentials) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return { data: mockLoginResponse }
      },
      invalidatesTags: ['User'],
    }),

    register: build.mutation<{ message: string; email: string }, RegisterRequest>({
      async queryFn(userData) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return {
          data: {
            message: 'Đăng ký thành công. Vui lòng xác nhận email.',
            email: userData.email
          }
        }
      },
    }),

    verifyEmail: build.mutation<UserResponse, VerifyEmailRequest>({
      async queryFn(data) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return { data: { ...mockUser, email: data.email } }
      },
      invalidatesTags: ['User'],
    }),

    resendVerification: build.mutation<{ message: string }, string>({
      async queryFn(_email) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return {
          data: {
            message: 'Mã xác nhận đã được gửi lại đến email của bạn.'
          }
        }
      },
    }),

    logout: build.mutation<{ success: boolean }, void>({
      async queryFn(_arg, api) {
        try {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
          }
          api.dispatch(baseApi.util.resetApiState())
          return { data: { success: true } }
        } catch (e: unknown) {
          const err: FetchBaseQueryError = {
            status: 500,
            data: { message: String(e) },
          }
          return { error: err }
        }
      },
      invalidatesTags: ['User'],
    }),

    me: build.query<UserResponse, void>({
      async queryFn() {
        await new Promise(resolve => setTimeout(resolve, 300))
        return { data: mockUser }
      },
      providesTags: ['User'],
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useMeQuery,
  useLazyMeQuery,
} = authApi
