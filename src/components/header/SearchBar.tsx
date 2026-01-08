'use client'

import React from 'next/link';
import { SearchIcon } from '../icons/HeaderIcons';

export function SearchBar() {
  return (
    <form className="flex items-center bg-white rounded-xl h-[36px] overflow-hidden flex-grow max-w-[400px]">
      <button type="submit" className="px-2 text-gray-500">
        <SearchIcon className="w-5 h-5" />
      </button>
      <input
        type="text"
        placeholder="Bạn cần tìm gì?"
        className="flex-1 h-full outline-none text-[13px] text-gray-800 px-1"
      />
    </form>
  );
}