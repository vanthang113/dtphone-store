import ReviewFilters from "./ReviewFilters";
import ReviewList from "./ReviewList";
import ReviewSummary from "./ReviewSummary";

type ReviewSectionProps = {
  slug: string;
};

export default function ReviewSection({ slug }: ReviewSectionProps) {
  return (
    <div className="w-full h-full bg-gray-100 rounded-lg mt-4 sm:mt-5 md:mt-6 px-3 sm:px-4 py-3 sm:py-4">
      <h1 className="text-lg sm:text-xl font-bold">Đánh giá {slug}</h1>
      <ReviewSummary />
      <ReviewFilters />
      <ReviewList />
    </div>
  );
}