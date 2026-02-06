type TechnicalSpec = [string, string];

type TechnicalSpecsProps = {
  specs: TechnicalSpec[];
};

export default function TechnicalSpecs({ specs }: TechnicalSpecsProps) {
  return (
    <div className="mt-4 sm:mt-5 md:mt-6 w-full border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden text-xs sm:text-sm text-gray-800">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b bg-gray-100">
        <h3 className="font-semibold text-base sm:text-lg text-gray-800">Thông số kỹ thuật</h3>
        <a href="#" className="text-[#00868B] text-xs sm:text-sm hover:underline">Xem tất cả</a>
      </div>
      {specs.map(([label, value], index) => (
        <div
          key={index}
          className={`grid grid-cols-2 px-3 sm:px-4 py-2 sm:py-3 ${index !== 0 && 'border-t'} ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="font-medium text-gray-700 text-xs sm:text-sm">{label}</div>
          <div className="whitespace-pre-line text-xs sm:text-sm">{value}</div>
        </div>
      ))}
    </div>
  );
}