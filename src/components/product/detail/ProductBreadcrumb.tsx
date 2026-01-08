// src/components/product/detail/ProductBreadcrumb.tsx
import Link from 'next/link';
import React from 'react'; // Thêm dòng này
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

type BreadcrumbItem = { href: string; label: string };

type ProductBreadcrumbProps = {
  slug: string;
};

const ProductBreadcrumb = ({ slug }: ProductBreadcrumbProps) => {
  const breadcrumbs: BreadcrumbItem[] = [
    { href: '/', label: 'Trang chủ' },
    { href: '/dien-thoai', label: 'Điện thoại' },
    { href: '/apple', label: 'Apple' },
    { href: '/iphone-16-series', label: 'iPhone 16 Series' },
    { href: `/products/${slug}`, label: slug },
  ];

  return (
    <header className="bg-white h-10 flex items-center justify-between px-4 text-black fixed w-full top-16 z-10">
      <nav className="space-x-2 text-xs mx-auto max-w-[1200px] w-full px-2">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>
                      {index === 0 && <span className="mr-2">🏠</span>}
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
    </header>
  );
};

export default ProductBreadcrumb;