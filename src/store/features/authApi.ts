import { baseApi } from "../baseApi"
import { mockLoginResponse, mockUser } from "@/data/mockData"

// Types
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

// Auth API endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Đăng nhập (Mock)
    login: build.mutation<LoginResponse, LoginRequest>({
      async queryFn(credentials) {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500))
        // Return mock data for any email/password
        return { data: mockLoginResponse }
      },
      invalidatesTags: ['User'],
    }),

    // Đăng ký (Mock)
    register: build.mutation<{ message: string; email: string }, RegisterRequest>({
      async queryFn(userData) {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return { 
          data: { 
            message: 'Đăng ký thành công. Vui lòng xác nhận email.',
            email: userData.email 
          } 
        }
      },
    }),

    // Xác nhận email (Mock)
    verifyEmail: build.mutation<UserResponse, VerifyEmailRequest>({
      async queryFn(data) {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return { data: { ...mockUser, email: data.email } }
      },
      invalidatesTags: ['User'],
    }),

    // Gửi lại mã xác nhận (Mock)
    resendVerification: build.mutation<{ message: string }, string>({
      async queryFn(email) {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return { 
          data: { 
            message: 'Mã xác nhận đã được gửi lại đến email của bạn.' 
          } 
        }
      },
    }),

    // Đăng xuất (client-side): xóa token, reset cache
    logout: build.mutation<{ success: boolean }, void>({
      async queryFn(_arg, api) {
        try {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
          }
          // reset RTK Query cache/state
          api.dispatch(baseApi.util.resetApiState())
          return { data: { success: true } }
        } catch (e: any) {
          return { error: { status: 'CUSTOM_ERROR', error: String(e) } as any }
        }
      },
      invalidatesTags: ['User'],
    }),

    // Lấy thông tin user hiện tại (Mock)
    me: build.query<UserResponse, void>({
      async queryFn() {
        // Simulate delay
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
