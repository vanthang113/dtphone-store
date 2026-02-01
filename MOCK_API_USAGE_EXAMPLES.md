/**
 * Example: How to use the Mock APIs in Components
 * 
 * This file demonstrates the correct way to use the mock APIs
 * that have been set up for development without a backend.
 */

// ============ EXAMPLE 1: Using Product API ============
/*
'use client'

import { useGetProductsQuery, useGetProductQuery } from '@/store/features/productApi'

export function ProductListExample() {
  // Fetch all products with pagination
  const { data, isLoading, error } = useGetProductsQuery({ 
    page: 1, 
    page_size: 10 
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <div>
      {data?.products.map(product => (
        <div key={product.product_id}>
          <h3>{product.name}</h3>
          <p>Price: {product.price}đ</p>
        </div>
      ))}
    </div>
  )
}
*/

// ============ EXAMPLE 2: Using Auth API ============
/*
'use client'

import { useLoginMutation, useLogoutMutation } from '@/store/features/authApi'

export function LoginExample() {
  const [login, { isLoading }] = useLoginMutation()
  const [logout] = useLogoutMutation()

  const handleLogin = async () => {
    try {
      const result = await login({
        email: 'user@example.com',
        password: 'any-password' // Mock accepts any password
      }).unwrap()

      localStorage.setItem('access_token', result.access_token)
      localStorage.setItem('refresh_token', result.refresh_token)
      
      console.log('Login successful')
    } catch (err) {
      console.error('Login failed', err)
    }
  }

  const handleLogout = async () => {
    await logout().unwrap()
    console.log('Logged out')
  }

  return (
    <div>
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
*/

// ============ EXAMPLE 3: Using Cart API ============
/*
'use client'

import { useGetCartQuery, useAddToCartMutation } from '@/store/features/cartApi'

export function CartExample() {
  const { data: cart } = useGetCartQuery()
  const [addToCart] = useAddToCartMutation()

  const handleAddProduct = async () => {
    await addToCart({
      product_id: 1,
      quantity: 1,
      price: 15990000,
      product_name: 'Samsung Galaxy S24 FE',
      product_image: '/images/my_phone/dien-thoai-samsung-galaxy-s24-fe_3__4.webp'
    }).unwrap()
  }

  return (
    <div>
      <button onClick={handleAddProduct}>
        Add to Cart
      </button>
      <p>Cart Total: {cart?.total}đ</p>
      <p>Items: {cart?.cart_items.length}</p>
    </div>
  )
}
*/

// ============ EXAMPLE 4: Using Order API ============
/*
'use client'

import { useGetOrdersQuery, useCreateOrderMutation } from '@/store/features/orderApi'

export function OrderExample() {
  const { data } = useGetOrdersQuery()
  const [createOrder] = useCreateOrderMutation()

  const handleCreateOrder = async () => {
    await createOrder({
      user_id: 1,
      total_price: 15990000,
      payment_method: 'credit_card',
      delivery_address: '123 Main St, City',
      items: []
    }).unwrap()
  }

  return (
    <div>
      <button onClick={handleCreateOrder}>
        Create Order
      </button>
      <p>Total Orders: {data?.orders.length}</p>
    </div>
  )
}
*/

// ============ KEY POINTS ============
/**
 * 1. All mock APIs work exactly like real APIs
 * 2. They return data after a simulated delay (300-500ms)
 * 3. Error handling works the same way
 * 4. Cart and order state persists during the session
 * 5. Tokens are stored in localStorage
 * 
 * 6. To test:
 *    - Open browser DevTools
 *    - Try login with any email/password
 *    - Add products to cart
 *    - Create orders
 *    - All flows should work seamlessly
 * 
 * 7. When backend is ready:
 *    - Change query() calls to real API endpoints
 *    - Remove simulated delays
 *    - Everything else stays the same
 */

export const MOCK_API_EXAMPLES = {
  description: 'See comments above for usage examples',
  allApisReady: true,
  testWithAnyCredentials: true,
  productCount: 6,
  mockDataLocation: 'src/data/mockData.ts',
}


