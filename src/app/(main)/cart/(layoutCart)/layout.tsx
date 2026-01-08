"use client";

import { ChevronLeft } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const cartPage = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="md:max-w-[600px] bg-gray-100 mx-auto relative">
      <div className="max-h-screen overflow-y-scroll no-scrollbar">
        {/* Header */}
        <div className="w-full border-b-1 border-gray-200 mb-2.5 bg-gray-100">
          <div className="flex px-4 py-3">
            <Link href={`${pathname == "/cart/payment" ? "/cart/payment-info" : "/"}`}>
              {" "}
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </Link>

            <div className="mx-auto">
              {" "}
              <h1 className="text-lg font-semibold text-black">
                {" "}
                {pathname == "/cart/payment" ? "Thanh Toán" : "Thông tin"}{" "}
              </h1>
            </div>
          </div>
        </div>

        <div className="items-center sticky top-0 z-10 bg-gray-100 py-3 justify-around mb-2.5 sm:flex gap-3">
          <div
            className={`border-b-2 px-20 font-semibold ${
              pathname == "/cart/payment-info"
                ? "border-red-600 text-red-600"
                : "border-gray-600"
            }`}
          >
            1. THÔNG TIN
          </div>

          <div
            className={`border-b-2 px-20 font-semibold ${
              pathname == "/cart/payment"
                ? "border-red-600 text-red-600"
                : "border-gray-600"
            }`}
          >
            2. THANH TOÁN
          </div>
        </div>

        <div className="mb-28">
          {/* main */}
          {children}
        </div>

        {/* Removed conflicting bottom summary - each page handles its own bottom section */}
      </div>
    </div>
  );
};

export default cartPage;