import { baseApi } from "../baseApi"

// Mock cart state
let mockCartState = {
  cart_id: 1,
  user_id: 1,
  cart_items: [] as CartItem[],
  total: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// Types for cart
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

interface AddToCartRequest {
  product_id: number
  product_name?: string
  product_image?: string
  quantity: number
  price: number
}

// Cart API endpoints
export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Lấy giỏ hàng (Mock)
    getCart: build.query<Cart, void>({
      async queryFn() {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 300))
        return { data: mockCartState }
      },
      providesTags: ['Cart'],
    }),

    // Thêm vào giỏ hàng (Mock)
    addToCart: build.mutation<Cart, AddToCartRequest>({
      async queryFn(data) {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const existingItem = mockCartState.cart_items.find(
          item => item.product_id === data.product_id
        )
        
        if (existingItem) {
          // Update quantity if product already exists
          existingItem.quantity += data.quantity
        } else {
          // Add new item
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
        
        // Recalculate total
        mockCartState.total = mockCartState.cart_items.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        )
        mockCartState.updated_at = new Date().toISOString()
        
        return { data: mockCartState }
      },
      invalidatesTags: ['Cart'],
    }),

    // Cập nhật số lượng (Mock)
    updateCartItem: build.mutation<Cart, { item_id: number; quantity: number }>({
      async queryFn({ item_id, quantity }) {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const item = mockCartState.cart_items.find(i => i.item_id === item_id)
        
        if (!item) {
          return {
            error: {
              status: 404,
              data: { message: 'Cart item not found' }
            } as any
          }
        }
        
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          mockCartState.cart_items = mockCartState.cart_items.filter(i => i.item_id !== item_id)
        } else {
          item.quantity = quantity
        }
        
        // Recalculate total
        mockCartState.total = mockCartState.cart_items.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        )
        mockCartState.updated_at = new Date().toISOString()
        
        return { data: mockCartState }
      },
      invalidatesTags: ['Cart'],
    }),

    // Xóa item khỏi giỏ hàng (Mock)
    removeCartItem: build.mutation<Cart, number>({
      async queryFn(item_id) {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        mockCartState.cart_items = mockCartState.cart_items.filter(i => i.item_id !== item_id)
        
        // Recalculate total
        mockCartState.total = mockCartState.cart_items.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        )
        mockCartState.updated_at = new Date().toISOString()
        
        return { data: mockCartState }
      },
      invalidatesTags: ['Cart'],
    }),

    // Xóa toàn bộ giỏ hàng (Mock)
    clearCart: build.mutation<Cart, void>({
      async queryFn() {
        // Simulate delay
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
