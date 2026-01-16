import { baseApi } from '../baseApi'
import { mockOrders, mockPromotions, getRelatedProducts } from '@/data/mockData'

// Types for orders
interface Order {
  order_id: number
  user_id: number
  total_price: number
  status: string
  payment_method: string
  delivery_address: string
  created_at: string
  updated_at: string
  items: OrderItem[]
}

interface OrderItem {
  product_id: number
  product_name: string
  quantity: number
  price: number
  image: string
}

interface Promotion {
  promotion_id: number
  title: string
  description: string
  discount_percent?: number
  discount_type?: string
  start_date: string
  end_date: string
  status: string
}

// Order and Promotion API endpoints
export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Lấy danh sách đơn hàng (Mock)
    getOrders: build.query<{ orders: Order[]; total: number }, void>({
      async queryFn() {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 400))
        return { 
          data: { 
            orders: mockOrders,
            total: mockOrders.length 
          } 
        }
      },
      providesTags: ['Order'],
    }),

    // Lấy chi tiết đơn hàng (Mock)
    getOrder: build.query<Order, number>({
      async queryFn(id) {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const order = mockOrders.find(o => o.order_id === id)
        
        if (!order) {
          return {
            error: {
              status: 404,
              data: { message: 'Order not found' }
            } as any
          }
        }
        
        return { data: order }
      },
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

    // Tạo đơn hàng mới (Mock)
    createOrder: build.mutation<Order, Partial<Order>>({
      async queryFn(orderData) {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const newOrder: Order = {
          order_id: mockOrders.length + 1,
          user_id: orderData.user_id || 1,
          total_price: orderData.total_price || 0,
          status: 'pending',
          payment_method: orderData.payment_method || 'credit_card',
          delivery_address: orderData.delivery_address || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          items: orderData.items || [],
        }
        
        mockOrders.push(newOrder)
        return { data: newOrder }
      },
      invalidatesTags: ['Order'],
    }),

    // Lấy danh sách khuyến mãi (Mock)
    getPromotions: build.query<Promotion[], void>({
      async queryFn() {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 300))
        return { data: mockPromotions }
      },
      providesTags: ['Promotion'],
    }),

    // Lấy sản phẩm liên quan (Mock)
    getRelatedProducts: build.query<{ products: any[] }, number>({
      async queryFn(productId) {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const related = getRelatedProducts(productId, 6)
        return { data: { products: related } }
      },
      providesTags: ['Product'],
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useGetPromotionsQuery,
  useGetRelatedProductsQuery,
} = orderApi
