
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
    title: 'Smember | Đăng nhập - Tích điểm đổi quà',
    description:
        'Đăng nhập vào tài khoản Smember của CellphoneS. Tích điểm Smember săn voucher, mức chiết khấu và ưu đãi sinh nhật hấp dẫn.',
    keywords: 'Smember,Đăng nhập,Tích điểm đổi quà',
    robots: 'index, follow',
    canonical: 'https://smember.com.vn/login',
    og: {
        title: 'Smember | Đăng nhập - Tích điểm đổi quà',
        description:
            'Đăng nhập vào tài khoản Smember của CellphoneS. Tích điểm Smember săn voucher, mức chiết khấu và ưu đãi sinh nhật hấp dẫn.',
        url: 'https://smember.com.vn/login',
        site_name: 'Web Smember',
        locale: 'vi_VN',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Smember | Đăng nhập - Tích điểm đổi quà',
        description:
            'Đăng nhập vào tài khoản Smember của CellphoneS. Tích điểm Smember săn voucher, mức chiết khấu và ưu đãi sinh nhật hấp dẫn.',
    },
};

function LoginPage() {
    return (
        <div className="min-h-screen w-full">
            <div className="w-full px-4 py-6 tablet:px-8 tablet:py-16">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;