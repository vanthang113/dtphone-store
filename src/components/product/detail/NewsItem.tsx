import Image from 'next/image';
import Link from 'next/link';

export default function NewsItem() {
  return (
    <div
      className="rounded-lg py-2 px-2 flex flex-row"
      style={{ backgroundColor: '#fff', color: 'black', borderColor: '#e4e4e7' }}
    >
      <Image
        src="/images/top_banner.png"
        alt="Phụ kiện 2"
        width={80}
        height={60}
        className="mr-3 object-cover rounded"
      />
      <div className="flex-1 text-sm" style={{ maxHeight: '3em' }}>
        <Link href="" className="hover:underline">
          Dán kính cường lực iPhone 16 Pro Max chính hãng JCPal
        </Link>
      </div>
    </div>
  );
}