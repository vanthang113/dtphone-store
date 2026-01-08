import { baseApi } from '../baseApi'

// Types for products
interface Product {
  product_id: number
  name: string
  price: number
  discount_price?: number
  brand?: string
  rating?: number
  rating_count?: number
  color?: string
  description?: string
  status?: string
  category_id: number
  sku?: string
  created_at: string
  updated_at: string
}

interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  page_size: number
}

// Product API endpoints
export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Lấy danh sách sản phẩm
    getProducts: build.query<ProductsResponse, {
      page?: number
      page_size?: number
      category_id?: number
      search?: string
    }>({
      query: (params) => ({
        url: '/api/v1/products',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ product_id }) => ({ type: 'Product' as const, id: product_id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    // Lấy chi tiết sản phẩm
    getProduct: build.query<Product, number>({
      query: (id) => ({ url: `/api/v1/products/${id}` }),
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useLazyGetProductsQuery,
} = productApi
