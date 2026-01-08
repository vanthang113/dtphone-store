// components/menuslide/MenuSlide.tsx
import Link from "next/link";

const menuItems = [
  { label: "Laptop học tập", href: "/categories/laptop" },
  { label: "Tablet", href: "/categories/tablet" },
  { label: "Tai nghe", href: "/categories/headphones" },
];

export default function MenuSlide() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r p-4 hidden md:block">
      <h2 className="text-lg font-semibold mb-4">Danh mục</h2>
      <ul className="space-y-2">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.href}
              className="block px-3 py-2 rounded hover:bg-red-600 hover:text-white transition"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
