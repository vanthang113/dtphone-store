"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

type OtpInputsProps = {
  value: string;              // chỉ số, ví dụ "123456"
  length?: number;            // mặc định 6
  onChange: (nextValue: string) => void;
  disabled?: boolean;
};

export default function OtpInputs({
  value,
  length = 6,
  onChange,
  disabled = false,
}: OtpInputsProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const digits = useMemo(() => {
    const cleaned = (value || "").replace(/\D/g, "").slice(0, length);
    return Array.from({ length }, (_, i) => cleaned[i] ?? "");
  }, [value, length]);

  const focusAt = (idx: number) => {
    const el = inputsRef.current[idx];
    if (el) el.focus();
  };

  const setDigitAt = (idx: number, digit: string) => {
    const next = [...digits];
    next[idx] = digit;
    onChange(next.join(""));
  };

  const handleChange = (idx: number, raw: string) => {
    if (disabled) return;

    const onlyNums = raw.replace(/\D/g, "");
    if (!onlyNums) {
      setDigitAt(idx, "");
      return;
    }

    // nếu dán nhiều số vào 1 ô
    if (onlyNums.length > 1) {
      const merged = (digits.join("") + onlyNums).replace(/\D/g, "").slice(0, length);
      onChange(merged);

      const nextIndex = Math.min(length - 1, merged.length - 1);
      focusAt(nextIndex);
      return;
    }

    setDigitAt(idx, onlyNums);
    if (idx < length - 1) focusAt(idx + 1);
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Backspace") {
      if (digits[idx]) {
        setDigitAt(idx, "");
      } else if (idx > 0) {
        focusAt(idx - 1);
        setDigitAt(idx - 1, "");
      }
    }

    if (e.key === "ArrowLeft" && idx > 0) focusAt(idx - 1);
    if (e.key === "ArrowRight" && idx < length - 1) focusAt(idx + 1);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    const text = e.clipboardData.getData("text");
    const onlyNums = text.replace(/\D/g, "").slice(0, length);
    if (!onlyNums) return;

    e.preventDefault();
    onChange(onlyNums);
    focusAt(Math.min(length - 1, onlyNums.length - 1));
  };

  useEffect(() => {
    // nếu đang trống thì focus ô đầu
    if (!digits.join("")) focusAt(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onPaste={handlePaste} className="flex items-center justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          value={digits[idx]}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          disabled={disabled}
          className={cn(
            "h-12 w-12 sm:h-14 sm:w-14 rounded-xl border border-neutral-300 bg-white text-center text-lg sm:text-xl font-semibold",
            "focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500",
            disabled && "opacity-60 cursor-not-allowed"
          )}
        />
      ))}
    </div>
  );
}
