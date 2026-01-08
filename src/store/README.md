# Store Structure

Cấu trúc Redux store với RTK Query được tổ chức theo từng feature:

## Files

- `baseApi.ts` - Base API configuration với authentication headers và tag types
- `index.ts` - Redux store configuration
- `features/` - Feature-specific API slices:
  - `authApi.ts` - Authentication endpoints (login, register, verify, me)
  - `productApi.ts` - Product endpoints (list, detail)
  - `cartApi.ts` - Cart endpoints (get, add, update, remove)

## Usage

### Import hooks từ feature APIs:

```typescript
// Auth
import { useLoginMutation, useRegisterMutation, useMeQuery } from '@/store/features/authApi'

// Products
import { useGetProductsQuery, useGetProductQuery } from '@/store/features/productApi'

// Cart
import { useGetCartQuery, useAddToCartMutation } from '@/store/features/cartApi'
```

### Example: Login component

```typescript
const [login, { isLoading, error }] = useLoginMutation()

const handleLogin = async () => {
  try {
    const result = await login({ email, password }).unwrap()
    localStorage.setItem('access_token', result.access_token)
  } catch (err) {
    // handle error
  }
}
```

## Adding New Features

1. Tạo file mới trong `features/` (ví dụ: `orderApi.ts`)
2. Import `baseApi` và dùng `injectEndpoints()`
3. Export hooks từ API slice
4. Tag types đã được định nghĩa sẵn trong `baseApi.ts`

## Environment Variables

Cần set `NEXT_PUBLIC_API_URL` trong `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```
