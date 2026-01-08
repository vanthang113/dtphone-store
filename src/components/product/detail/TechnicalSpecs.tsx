type TechnicalSpec = [string, string];

type TechnicalSpecsProps = {
  specs: TechnicalSpec[];
};

export default function TechnicalSpecs({ specs }: TechnicalSpecsProps) {
  return (
    <div className="mt-6 w-full border border-gray-200 rounded-xl overflow-hidden text-sm text-gray-800">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-100">
        <h3 className="font-semibold text-lg text-gray-800">Thông số kỹ thuật</h3>
        <a href="#" className="text-blue-600 text-sm hover:underline">Xem tất cả</a>
      </div>
      {specs.map(([label, value], index) => (
        <div
          key={index}
          className={`grid grid-cols-2 px-4 py-3 ${index !== 0 && 'border-t'} ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="font-medium text-gray-700">{label}</div>
          <div className="whitespace-pre-line">{value}</div>
        </div>
      ))}
    </div>
  );
}