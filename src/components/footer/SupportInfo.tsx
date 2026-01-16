'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SupportNumber {
  number: string;
  label: string;
}

interface Newsletter {
  title: string;
  perks: string[];
  terms: string;
}

interface SupportInfoProps {
  supportNumbers: SupportNumber[];
  paymentMethods: { src: string; alt: string; href: string }[];
  newsletter: Newsletter;
}

export function SupportInfo({ supportNumbers, paymentMethods, newsletter }: SupportInfoProps) {
  return (
    <>
      <h3 className="text-base font-medium text-gray-700 mb-3">Tổng đài hỗ trợ miễn phí</h3>
      <ul className="list-none p-0 text-sm">
        {supportNumbers.map((item, index) => (
          <li key={index} className="mb-1">
            {item.label} <Link href={`tel:${item.number}`} className="font-bold text-gray-600 no-underline">{item.number}</Link>
          </li>
        ))}
      </ul>

      <h3 className="text-base font-medium text-gray-700 mb-3">Phương thức thanh toán</h3>
      <ul className="list-none p-0 flex flex-wrap gap-1">
        {paymentMethods.map((method, index) => (
          <li key={index} className="border border-gray-300 rounded-md">
            <Link href={method.href}>
              <Image src={method.src} alt={method.alt} width={50} height={32} className="object-contain" />
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="text-base font-medium text-gray-700 mt-3">{newsletter.title}</h3>
      {newsletter.perks.map((perk, index) => (
        <p key={index} className={index === 0 ? "text-[#00868B] text-sm" : "text-xs"}>{perk}</p>
      ))}
      <div className="mb-3">
        <input
          type="email"
          placeholder="Email *"
          required
          className="w-full h-8 p-2 border border-gray-300 rounded-md shadow-sm text-sm"
        />
      </div>
      <div className="mb-3">
        <input
          type="tel"
          placeholder="Số điện thoại"
          maxLength={10}
          className="w-full h-8 p-2 border border-gray-300 rounded-md shadow-sm text-sm"
        />
      </div>
      <div className="flex items-center mb-3">
        <label className="flex items-center gap-1 text-sm">
          <input type="checkbox" checked disabled className="cursor-not-allowed" />
          <Link href="#" className="text-[#00868B] text-xs no-underline">{newsletter.terms}</Link>
        </label>
      </div>
      <button className="w-full bg-[#00777B] text-white font-semibold rounded-md py-2 text-sm">
        ĐĂNG KÝ NGAY
      </button>
    </>
  );
}