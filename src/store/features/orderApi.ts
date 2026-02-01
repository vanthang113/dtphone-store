import { baseApi } from "../baseApi";
import { mockOrders, mockPromotions, getRelatedProducts } from "@/data/mockData";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface Order {
  order_id: number;
  user_id: number;
  total_price: number;
  status: string;
  payment_method: string;
  delivery_address: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

interface OrderItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Promotion {
  promotion_id: number;
  title: string;
  description: string;
  discount_percent?: number;
  discount_type?: string;
  start_date: string;
  end_date: string;
  status: string;
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<{ orders: Order[]; total: number }, void>({
      async queryFn() {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return {
          data: {
            orders: mockOrders,
            total: mockOrders.length,
          },
        };
      },
      providesTags: ["Order"],
    }),

    getOrder: build.query<Order, number>({
      async queryFn(id) {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const order = mockOrders.find((o) => o.order_id === id);

        if (!order) {
          return {
            error: {
              status: 404,
              data: { message: "Order not found" },
            } as FetchBaseQueryError,
          };
        }

        return { data: order };
      },
      providesTags: (result, error, id) => {
        void result;
        void error;
        return [{ type: "Order" as const, id }];
      },
    }),

    createOrder: build.mutation<Order, Partial<Order>>({
      async queryFn(orderData) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newOrder: Order = {
          order_id: mockOrders.length + 1,
          user_id: orderData.user_id || 1,
          total_price: orderData.total_price || 0,
          status: "pending",
          payment_method: orderData.payment_method || "credit_card",
          delivery_address: orderData.delivery_address || "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          items: orderData.items || [],
        };

        mockOrders.push(newOrder);
        return { data: newOrder };
      },
      invalidatesTags: ["Order"],
    }),

    getPromotions: build.query<Promotion[], void>({
      async queryFn() {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return { data: mockPromotions };
      },
      providesTags: ["Promotion"],
    }),

    getRelatedProducts: build.query<{ products: unknown[] }, number>({
      async queryFn(productId) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const related: unknown[] = getRelatedProducts(productId, 6);
        return { data: { products: related } };
      },
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useGetPromotionsQuery,
  useGetRelatedProductsQuery,
} = orderApi;
