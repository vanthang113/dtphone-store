'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PaymentMethod {
  src: string;
  alt: string;
  href: string;
}

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
}

export function PaymentMethods({ paymentMethods }: PaymentMethodsProps) {
  return (
    <ul className="list-none p-0 flex flex-wrap gap-1">
      {paymentMethods.map((method, index) => (
        <li key={index} className="border border-gray-300 rounded-md">
          <Link href={method.href}>
            <Image src={method.src} alt={method.alt} width={50} height={32} className="object-contain" />
          </Link>
        </li>
      ))}
    </ul>
  );
}