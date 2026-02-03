import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AuthCardProps = {
  mascotSrc?: string;
  mascotAlt?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export default function AuthCard({
  mascotSrc = "/images/auth/robo1.png",
  mascotAlt = "Mascot",
  title,
  description,
  children,
  className,
}: AuthCardProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[880px] rounded-2xl border border-neutral-200 bg-white shadow-sm",
        "px-4 py-8 sm:px-10 sm:py-10",
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-3">
          <Image
            src={mascotSrc}
            alt={mascotAlt}
            width={120}
            height={120}
            className="h-[72px] w-auto sm:h-[90px] object-contain"
            priority
          />
        </div>

        <h2 className="text-xl sm:text-3xl font-extrabold text-red-600">{title}</h2>

        {description ? (
          <p className="mt-2 max-w-[520px] text-sm sm:text-base text-neutral-700 leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>

      <div className="mt-7 sm:mt-8">{children}</div>
    </div>
  );
}
