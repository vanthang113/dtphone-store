import { baseApi } from "../baseApi";
import { mockProducts } from "@/data/mockData";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface Product {
  product_id: number;
  name: string;
  price: number;
  discount_price?: number;
  brand?: string;
  rating?: number;
  rating_count?: number;
  color?: string;
  description?: string;
  status?: string;
  category_id: number;
  sku?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  page_size: number;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<
      ProductsResponse,
      { page?: number; page_size?: number; category_id?: number; search?: string }
    >({
      async queryFn(params) {
        await new Promise((resolve) => setTimeout(resolve, 400));

        const page = params.page || 1;
        const pageSize = params.page_size || 10;

        let filtered = mockProducts;

        if (params.category_id) {
          filtered = filtered.filter((p) => p.category_id === params.category_id);
        }

        if (params.search) {
          const q = params.search.toLowerCase();
          filtered = filtered.filter((p) => p.name.toLowerCase().includes(q));
        }

        const startIdx = (page - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        const paginatedProducts = filtered.slice(startIdx, endIdx);

        return {
          data: {
            products: paginatedProducts,
            total: filtered.length,
            page,
            page_size: pageSize,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ product_id }) => ({
                type: "Product" as const,
                id: product_id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProduct: build.query<Product, number>({
      async queryFn(id) {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const product = mockProducts.find((p) => p.product_id === id);

        if (!product) {
          return {
            error: {
              status: 404,
              data: { message: "Product not found" },
            } as FetchBaseQueryError,
          };
        }

        return { data: product };
      },
      providesTags: (result, error, id) => {
        void result;
        void error;
        return [{ type: "Product" as const, id }];
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery, useLazyGetProductsQuery } = productApi;
