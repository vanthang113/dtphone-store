import { baseApi } from "../baseApi"

// Types for cart
interface CartItem {
  item_id: number
  cart_id: number
  product_id: number
  quantity: number
  price: number
}

interface Cart {
  cart_id: number
  user_id: number
  cart_items: CartItem[]
  total: number
  created_at: string
  updated_at: string
}

interface AddToCartRequest {
  product_id: number
  quantity: number
  price: number
}

// Cart API endpoints
export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Lấy giỏ hàng
    getCart: build.query<Cart, void>({
      query: () => ({ url: '/api/v1/carts' }),
      providesTags: ['Cart'],
    }),

    // Thêm vào giỏ hàng
    addToCart: build.mutation<Cart, AddToCartRequest>({
      query: (data) => ({
        url: '/api/v1/carts/items',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),

    // Cập nhật số lượng
    updateCartItem: build.mutation<Cart, { item_id: number; quantity: number }>({
      query: ({ item_id, quantity }) => ({
        url: `/api/v1/carts/items/${item_id}`,
        method: 'PUT',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),

    // Xóa item khỏi giỏ hàng
    removeCartItem: build.mutation<void, number>({
      query: (item_id) => ({
        url: `/api/v1/carts/items/${item_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

    // Xóa toàn bộ giỏ hàng
    clearCart: build.mutation<void, void>({
      query: () => ({
        url: '/api/v1/carts',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
})

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi
