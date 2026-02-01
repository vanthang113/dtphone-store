import { baseApi } from "../baseApi"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"

interface CartItem {
  item_id: number
  cart_id: number
  product_id: number
  product_name?: string
  product_image?: string
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

const mockCartState: Cart = {
  cart_id: 1,
  user_id: 1,
  cart_items: [],
  total: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

interface AddToCartRequest {
  product_id: number
  product_name?: string
  product_image?: string
  quantity: number
  price: number
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<Cart, void>({
      async queryFn() {
        await new Promise(resolve => setTimeout(resolve, 300))
        return { data: mockCartState }
      },
      providesTags: ['Cart'],
    }),

    addToCart: build.mutation<Cart, AddToCartRequest>({
      async queryFn(data) {
        await new Promise(resolve => setTimeout(resolve, 300))

        const existingItem = mockCartState.cart_items.find(
          item => item.product_id === data.product_id
        )

        if (existingItem) {
          existingItem.quantity += data.quantity
        } else {
          const newItem: CartItem = {
            item_id: mockCartState.cart_items.length + 1,
            cart_id: mockCartState.cart_id,
            product_id: data.product_id,
            product_name: data.product_name,
            product_image: data.product_image,
            quantity: data.quantity,
            price: data.price,
          }
          mockCartState.cart_items.push(newItem)
        }

        mockCartState.total = mockCartState.cart_items.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        )
        mockCartState.updated_at = new Date().toISOString()

        return { data: mockCartState }
      },
      invalidatesTags: ['Cart'],
    }),

    updateCartItem: build.mutation<Cart, { item_id: number; quantity: number }>({
      async queryFn({ item_id, quantity }) {
        await new Promise(resolve => setTimeout(resolve, 300))

        const item = mockCartState.cart_items.find(i => i.item_id === item_id)

        if (!item) {
          const err: FetchBaseQueryError = {
            status: 404,
            data: { message: 'Cart item not found' },
          }
          return { error: err }
        }

        if (quantity <= 0) {
          mockCartState.cart_items = mockCartState.cart_items.filter(i => i.item_id !== item_id)
        } else {
          item.quantity = quantity
        }

        mockCartState.total = mockCartState.cart_items.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        )
        mockCartState.updated_at = new Date().toISOString()

        return { data: mockCartState }
      },
      invalidatesTags: ['Cart'],
    }),

    removeCartItem: build.mutation<Cart, number>({
      async queryFn(item_id) {
        await new Promise(resolve => setTimeout(resolve, 300))

        mockCartState.cart_items = mockCartState.cart_items.filter(i => i.item_id !== item_id)

        mockCartState.total = mockCartState.cart_items.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        )
        mockCartState.updated_at = new Date().toISOString()

        return { data: mockCartState }
      },
      invalidatesTags: ['Cart'],
    }),

    clearCart: build.mutation<Cart, void>({
      async queryFn() {
        await new Promise(resolve => setTimeout(resolve, 300))

        mockCartState.cart_items = []
        mockCartState.total = 0
        mockCartState.updated_at = new Date().toISOString()

        return { data: mockCartState }
      },
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
