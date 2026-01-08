import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
    title: 'Smember | Tri ân khách hàng thân thiết - Tích điểm đổi quà',
    description:
        'Quà tặng tri ân khách hàng thân thiết - VIP membership của CellphoneS. Tích điểm Smember săn voucher, mức chiết khấu và ưu đãi sinh nhật hấp dẫn.',
    keywords: 'Smember,Tri ân khách hàng,Khách hàng thân thiết,Tích điểm đổi quà',
    robots: 'index, follow',
    canonical: 'https://smember.com.vn',
    og: {
        title: 'Smember | Tri ân khách hàng thân thiết - Tích điểm đổi quà',
        description:
            'Quà tặng tri ân khách hàng thân thiết - VIP membership của CellphoneS. Tích điểm Smember săn voucher, mức chiết khấu và ưu đãi sinh nhật hấp dẫn.',
        url: 'https://smember.com.vn',
        site_name: 'Web Smember',
        locale: 'vi_VN',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Smember | Tri ân khách hàng thân thiết - Tích điểm đổi quà',
        description:
            'Quà tặng tri ân khách hàng thân thiết - VIP membership của CellphoneS. Tích điểm Smember săn voucher, mức chiết khấu và ưu đãi sinh nhật hấp dẫn.',
    },
};

export default function RegisterPage() {
    return (
        <div className="min-h-screen w-full">
            <div className="w-full px-4 py-6 tablet:px-8 tablet:py-16">
                <RegisterForm />
            </div>
        </div>
    );
}