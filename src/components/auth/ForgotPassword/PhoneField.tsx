"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type PhoneFieldProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label?: string;
  placeholder?: string;
  error?: string;
};

export default function PhoneField({
  value,
  onChange,
  id = "phone",
  label = "Số điện thoại",
  placeholder = "Nhập số điện thoại",
  error,
}: PhoneFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-neutral-800">
        {label}
      </Label>

      <Input
        id={id}
        value={value}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
          onChange(raw);
        }}
        placeholder={placeholder}
        inputMode="numeric"
        autoComplete="tel"
        className="h-11 sm:h-12 text-base"
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
