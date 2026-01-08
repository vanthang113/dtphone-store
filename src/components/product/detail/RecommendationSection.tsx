import ProductCard from '@/components/product/ProductCard';

export default function RecommendationSection() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Có thể bạn cũng thích</h2>
      <div className="flex flex-wrap gap-3 overflow-x-auto px-4 sm:px-0">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}