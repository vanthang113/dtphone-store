import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  children: React.ReactNode;
  title?: string;
  logoHref?: string;
  logoSrc?: string;
  logoAlt?: string;
  className?: string;
};

export default function AuthShell({
  children,
  title,
  logoHref = "/",
  logoSrc = "/images/logo-dt.png",
  logoAlt = "DTPhone",
  className,
}: AuthShellProps) {
  return (
    <div className={cn("min-h-[calc(100vh-80px)] w-full bg-white", className)}>
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 lg:py-10">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-[820px]">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Link href={logoHref} className="flex-shrink-0">
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  width={260}
                  height={80}
                  className="h-14 sm:h-16 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {title ? (
              <h1 className="text-center text-xl sm:text-2xl font-extrabold text-neutral-900">
                {title}
              </h1>
            ) : null}

            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
