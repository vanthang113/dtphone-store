'use client';

type Accessory = {
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  originalPrice: string;
};

type RelatedAccessoriesProps = {
  accessories: Accessory[];
  onAddToCart?: (accessory: string) => void;
};

export default function RelatedAccessories({ accessories, onAddToCart }: RelatedAccessoriesProps) {
  return (
    <div className="mt-4 relative bg-[#f7f7f8] rounded-lg overflow-hidden group">
      <div className="flex items-center justify-between gap-x-4 px-4 py-2">
        <h3 className="text-lg font-semibold mb-0">Phụ kiện mua cùng</h3>
      </div>
      <div className="px-4 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {accessories.map((accessory, index) => (
            <div
              key={index}
              className="w-full border rounded-lg py-2 px-1 flex flex-row"
              style={{ backgroundColor: '#fff', color: 'black', borderColor: '#e4e4e7' }}
            >
              <img
                src={accessory.imageSrc}
                alt={accessory.imageAlt}
                className="mr-3 w-[45px] h-[80px] object-cover rounded"
              />
              <div className="flex-1 text-sm" style={{ maxHeight: '3em' }}>
                <a
                  href=""
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    maxHeight: '3em',
                  }}
                >
                  {accessory.name}
                </a>
                <div className="flex items-center mt-2">
                  <p className="text-xs font-bold text-red-600">
                    {accessory.price}
                    <span className="block text-gray-500 line-through">{accessory.originalPrice}</span>
                  </p>
                  <button
                    className="bg-red-200 text-red-600 py-1 px-4 rounded-full text-xs font-medium ml-auto cursor-pointer"
                    onClick={() => onAddToCart?.(accessory.name)}
                  >
                    Thêm vào giỏ +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}   