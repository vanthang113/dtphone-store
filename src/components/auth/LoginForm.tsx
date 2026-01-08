'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useLoginMutation } from '@/store/features/authApi'

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleCheckboxChange = (name: string) => (checked: boolean) => {

        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const [login, { isLoading }] = useLoginMutation()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrorMessage('');
        
        console.log('Login attempt:', { email: formData.email });
        
        try {
            const result: any = await login({ email: formData.email, password: formData.password }).unwrap()
            console.log('Login success:', result);
            
            if (result?.data?.access_token) {
                localStorage.setItem('access_token', result.data.access_token)
            }
            if (result?.data?.refresh_token) {
                localStorage.setItem('refresh_token', result.data.refresh_token)
            }
            // redirect to user info page
            window.location.href = '/'
        } catch (err: any) {
            console.error('Login error:', err)
            setErrorMessage(err?.data?.message || err?.message || 'Đăng nhập thất bại. Vui lòng thử lại.')
        }
    };

    return (
        <div className="w-full max-w-[800px] mx-auto flex flex-col justify-center items-center gap-2 tablet:gap-4">
            {/* Logo quay về trang chủ */}
            <Link
                href="/"
                className="w-full flex justify-left mb-8 tablet:mb-10"
                >
                <Image
                    src="/images/logo-dtphone-store.png"
                    alt="DTPhone"
                    width={480}
                    height={160}
                    className="h-28 tablet:h-36 laptop:h-44 desktop:h-52 w-auto object-contain"
                    priority
                />
            </Link>
            <h1 className="text-xl tablet:text-3xl laptop:text-4xl text-left tablet:text-primary-500 font-bold color-red-500">
                Đăng nhập SMEMBER
            </h1>
            <form
                className="w-full flex flex-col gap-3 tablet:gap-4 relative px-2 tablet:px-0"
                onSubmit={handleSubmit}
            >
                <div className="w-full flex flex-col gap-3 tablet:gap-4">
                    <div className="flex flex-col gap-1 tablet:gap-2">
                        <Label htmlFor="email" className="text-sm tablet:text-base font-medium">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Nhập email"
                            className="min-h-[40px] tablet:min-h-[48px] text-sm tablet:text-base"
                        />
                    </div>
                    <div className="flex flex-col gap-1 tablet:gap-2">
                        <Label htmlFor="password" className="text-sm tablet:text-base font-medium">
                            Mật khẩu
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Nhập mật khẩu của bạn"
                                className="min-h-[40px] tablet:min-h-[48px] text-sm tablet:text-base pr-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full w-10"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 tablet:h-5 tablet:w-5 text-neutral-600" />
                                ) : (
                                    <Eye className="h-4 w-4 tablet:h-5 tablet:w-5 text-neutral-600" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="rememberMe"
                            checked={formData.rememberMe}
                            onCheckedChange={handleCheckboxChange('rememberMe')}
                        />
                        <Label
                            htmlFor="rememberMe"
                            className="text-sm tablet:text-base font-regular"
                        >
                            Ghi nhớ đăng nhập
                        </Label>
                    </div>
                    <Link
                        href="/forgot-password"
                        className="text-sm tablet:text-base font-medium text-info-500 hover:text-info-700"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>
                
                {errorMessage && (
                    <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>
                )}
                
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full min-h-[40px] tablet:min-h-[48px] text-sm tablet:text-base font-medium bg-red-500 hover:bg-red-700 text-white disabled:opacity-50"
                >
                    {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>

                <div className="w-full flex items-center gap-2">
                    <div className="flex-1 h-[1px] bg-neutral-200"></div>
                    <span className="text-sm tablet:text-base text-neutral-500">Hoặc</span>
                    <div className="flex-1 h-[1px] bg-neutral-200"></div>
                </div>
                <span className="font-regular text-sm tablet:text-lg text-neutral-500 text-center">
                    Đăng nhập bằng tài khoản mạng xã hội
                </span>
                <div className="w-full flex gap-2 tablet:gap-6 justify-between items-center max-w-[450px] mx-auto">
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 flex-1 min-w-[100px] tablet:min-w-[120px] min-h-[40px] tablet:min-h-[48px] text-sm tablet:text-base"
                    >
                        <Image
                            src="/images/logo-google.png"
                            alt="Google"
                            width={25}
                            height={24}
                            className="w-[20px] h-[20px] tablet:w-[25px] tablet:h-[24px] object-contain"
                        />
                        Google
                    </Button>
                    <div className="w-[5px] h-[5px] tablet:w-[7px] tablet:h-[7px] rounded-full bg-neutral-200 flex-shrink-0"></div>
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 flex-1 min-w-[100px] tablet:min-w-[120px] min-h-[40px] tablet:min-h-[48px] text-sm tablet:text-base"
                    >
                        Zalo
                    </Button>
                </div>
                <div className="w-full flex items-center justify-center gap-2">
                    <span className="text-sm tablet:text-base text-neutral-500">
                        Bạn chưa có tài khoản?
                    </span>
                    <Link
                        href="/register"
                        className="text-sm tablet:text-base font-medium text-red-500 hover:text-red-700"
                    >
                        Đăng ký ngay
                    </Link>
                </div>
            </form>
        </div>
    );
} 