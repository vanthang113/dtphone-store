'use client'

import React from 'react';
import ProductCard from "@/components/product/ProductCard";
import { ProductListSection } from "@/components/product/ProductListSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HighlightSection from '@/components/product/detail/HighlightSection';
import QASection from '@/components/product/detail/QASection';
    
export default function MenuSlidePage() {
    const relatedTags = [
        "Macbook",
        "Asus",
        "MSI",
        "Lenovo",
        "HP",
        "Acer",
        "Dell",
        "Huawei",
        "Gigabyte",
        "Laptop AI",
        "Xem tất cả",
    ];

    // Placeholder products
    const products = [
        { id: 1, name: "Product 1", image: "/placeholder.jpg", alt: "Product 1", price: 1000000, originalPrice: 1200000, sNullPrice: 0, sStudentDiscount: 0, promotion: "", rating: 4.5 },
        { id: 2, name: "Product 2", image: "/placeholder.jpg", alt: "Product 2", price: 1500000, originalPrice: 1800000, sNullPrice: 0, sStudentDiscount: 0, promotion: "", rating: 4.0 },
        { id: 3, name: "Product 3", image: "/placeholder.jpg", alt: "Product 3", price: 2000000, originalPrice: 2500000, sNullPrice: 0, sStudentDiscount: 0, promotion: "", rating: 4.8 },
        { id: 4, name: "Product 4", image: "/placeholder.jpg", alt: "Product 4", price: 1200000, originalPrice: 1400000, sNullPrice: 0, sStudentDiscount: 0, promotion: "", rating: 4.2 },
        { id: 5, name: "Product 5", image: "/placeholder.jpg", alt: "Product 5", price: 1800000, originalPrice: 2200000, sNullPrice: 0, sStudentDiscount: 0, promotion: "", rating: 4.7 },
    ];

    // Placeholder formatPrice function
    const formatPrice = (price: number) => `${price.toLocaleString('vi-VN')}đ`;

    // Scroll handler function with offset for fixed header
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = 120; // Height of the fixed header (top-[64px])
            const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: sectionPosition - headerOffset,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="mt-12">
            {/* Menu Slide Section */}
            <div className="fixed top-[64px] left-0 w-full bg-[#FFD700] text-white px-4 sm:px-6 lg:px-20 py-2 flex justify-around items-center z-40">
                <Button
                    className="text-base sm:text-xl text-white bg-[#00868B] font-bold py-1 px-3 sm:px-6 rounded-full border-0 hover:bg-white hover:text-[#c00c0c] hover:scale-105 hover:shadow-md transition duration-400 ease-in-out"
                    onClick={() => scrollToSection('register-section')}
                >
                    ĐĂNG KÝ
                </Button>
                <Button
                    className="text-base sm:text-xl text-white bg-[#00868B] font-bold py-1 px-3 sm:px-6 rounded-full border-0 hover:bg-white hover:text-[#c00c0c] hover:scale-105 hover:shadow-md transition duration-400 ease-in-out"
                    onClick={() => scrollToSection('events-section')}
                >
                    LỊCH SỰ KIỆN
                </Button>
                <Button
                    className="text-base sm:text-xl text-white bg-[#00868B] font-bold py-1 px-3 sm:px-6 rounded-full border-0 hover:bg-white hover:text-[#c00c0c] hover:scale-105 hover:shadow-md transition duration-400 ease-in-out"
                    onClick={() => scrollToSection('promotions-section')}
                >
                    ƯU ĐÃI
                </Button>
                <Button
                    className="text-base sm:text-xl text-white bg-[#00868B] font-bold py-1 px-3 sm:px-6 rounded-full border-0 hover:bg-white hover:text-[#c00c0c] hover:scale-105 hover:shadow-md transition duration-400 ease-in-out"
                    onClick={() => scrollToSection('top-deals-section')}
                >
                    MUA NGAY
                </Button>
            </div>

            {/* Banner Section with Conditional Image */}
            <div className="w-full">
                <Image
                    src="/images/banner-b2s-deading-desk.webp"
                    alt="Back to School 2025 Banner"
                    width={1200}
                    height={200}
                    className="w-full h-[300px] object-cover md:block hidden"
                    priority
                />
                <Image
                    src="/images/Header_LP_B2S_2025_DD1_Mb_1_.webp"
                    alt="Back to School 2025 Mobile Banner"
                    width={600}
                    height={300}
                    className="w-full h-auto object-cover block md:hidden"
                    priority
                />
            </div>

            <div className='max-w-[1200px] px-2 mx-auto'>
                {/* Đối tượng áp dụng */}
                <div id="register-section" className="rounded-2xl shadow-xl mt-6">
                    <Image
                        src="/images/B2S_2025_Register-desk-v2.webp"
                        alt="Đối tượng áp dụng"
                        width={1200}
                        height={150}
                        className="object-cover w-full md:block hidden"
                    />
                    <Image
                        src="/images/B2S_2025_Register-mobile.webp"
                        alt="Đối tượng áp dụng"
                        width={600}
                        height={300}
                        className="object-cover w-full block md:hidden"
                    />
                </div>


                {/* Tặng Sĩ tử 2025 */}
                <div className="shadow-xl mt-10 rounded-lg relative">
                    {/* Hình ảnh */}
                    <Image
                        src="/images/Tang_desktop.png"
                        alt="Tặng sĩ tử 2025"
                        width={1300}
                        height={300}
                        className="object-cover w-full md:block hidden rounded-lg"
                    />
                    <Image
                        src="/images/Tang-mobile.png"
                        alt="Tặng sĩ tử 2025"
                        width={600}
                        height={300}
                        className="object-cover w-full block md:hidden rounded-lg"
                    />

                    {/* Form tìm kiếm */}
                    <form
                        className="absolute 
                        top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        sm:top-1/2 sm:left-1/3 lg:-translate-x-1/2 sm:-translate-y-1/2
                        lg:top-1/2 lg:left-1/3 lg:-translate-x-1/2 lg:-translate-y-1/2
                        md:top-[55%] md:left-1/3 lg:-translate-x-1/2 md:-translate-y-1/2
                        flex items-center 
                        bg-white rounded-xl h-[60px] 
                        w-[80%] max-w-[650px] 
                        md:w-[55%]
                        px-2 shadow-md z-10
                        transition-all duration-300 ease-in-out
                        focus-within:shadow-lg focus-within:ring-2 focus-within:ring-red-400"
                    >
                        <input
                            type="text"
                            placeholder="Nhập số báo danh"
                            className="flex-1 h-full outline-none text-[14px] text-gray-800"
                        />

                        <div className="w-[1px] h-[60%] bg-gray-300 mx-2"></div>

                        <Button
                            type="submit"
                            className="bg-transparent text-gray-500 text-sm md:text-base flex-shrink text-center whitespace-nowrap shadow-none border-none hover:bg-transparent hover:cursor-pointer focus:outline-none focus:ring-0 "
                        >
                            NHẬN VOUCHER NGAY
                        </Button>

                    </form>
                </div>

                {/* Lịch khuyến mãi và sự kiện */}
                <div id="events-section" className="mt-6">
                    <Image
                        src="/images/sự kiện ngang.webp"
                        alt="Lịch khuyến mãi và sự kiện"
                        width={1200}
                        height={150}
                        className="object-cover w-full md:block hidden"
                    />
                    <Image
                        src="/images/sự kiện dọc.webp"
                        alt="Lịch khuyến mãi và sự kiện"
                        width={600}
                        height={300}
                        className="object-cover w-full block md:hidden"
                    />
                </div>

                {/* Quà tặng đặc quyền và Nhóm hàng đang ưu đãi */}
                <div id="promotions-section" className="mt-6">
                    <Image
                        src="/images/block-Qu_-t_ng.webp"
                        alt="Quà tặng đặc biệt"
                        width={1200}
                        height={150}
                        className="object-cover w-full md:block hidden"
                    />
                    <Image
                        src="/images/block-Qu_-t_ng_Mb-ngang.webp"
                        alt="Quà tặng đặc biệt"
                        width={600}
                        height={300}
                        className="object-cover w-full block md:hidden"
                    />
                </div>


                {/* Nhóm hàng đang ưu đãi */}
                <div className='mt-10'>
                    <div className='flex flex-col items-center'>
                        <Image
                            src="/images/Giam-gia.png"
                            alt="Các nhóm hàng đang ưu đãi"
                            width={700}
                            height={70}
                            className='mb-4'
                        />
                    </div>
                    <div className='w-full h-auto flex flex-wrap gap-2 sm:gap-3 lg:gap-6 items-start'>
                        {/* Button cha */}
                        <Button className="p-0 bg-transparent hover:cursor-pointer w-full h-full max-h-[100px] aspect-[2/3] lg:max-w-[310px] lg:max-h-none lg:h-full rounded-3xl shadow-xl hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-shadow duration-[400ms] ease-in-out">
                            <Image
                                src="/images/500k.png"
                                alt="Các nhóm hàng đang ưu đãi"
                                width={350}
                                height={300}
                                className="w-full h-full object-cover rounded-3xl"
                                priority
                            />
                        </Button>

                        {/* Button con */}
                        <div className='flex-1 min-w-[0] w-full grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 lg:gap-6'>
                            <Button className="bg-transparent w-full max-w-[285px] h-full max-h-[222px] rounded-none p-0 overflow-hidden hover:cursor-pointer rounded-3xl shadow-xl hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-shadow duration-[400ms] ease-in-out">
                                <Image
                                    src="/images/500k.png"
                                    alt="Các nhóm hàng đang ưu đãi"
                                    width={200}
                                    height={300}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </Button>
                            <Button className="bg-transparent w-full max-w-[285px] h-full max-h-[222px] rounded-none p-0 overflow-hidden hover:cursor-pointer rounded-3xl shadow-xl hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-shadow duration-[400ms] ease-in-out">
                                <Image
                                    src="/images/500k.png"
                                    alt="Các nhóm hàng đang ưu đãi"
                                    width={200}
                                    height={300}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </Button>
                            <Button className="bg-transparent w-full max-w-[285px] h-full max-h-[222px] rounded-none p-0 overflow-hidden hover:cursor-pointer rounded-3xl shadow-xl hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-shadow duration-[400ms] ease-in-out">
                                <Image
                                    src="/images/500k.png"
                                    alt="Các nhóm hàng đang ưu đãi"
                                    width={200}
                                    height={300}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </Button>
                            <Button className="bg-transparent w-full max-w-[285px] h-full max-h-[222px] rounded-none p-0 overflow-hidden hover:cursor-pointer rounded-3xl shadow-xl hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-shadow duration-[400ms] ease-in-out">
                                <Image
                                    src="/images/500k.png"
                                    alt="Các nhóm hàng đang ưu đãi"
                                    width={200}
                                    height={300}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </Button>
                            <Button className="bg-transparent w-full max-w-[285px] h-full max-h-[222px] rounded-none p-0 overflow-hidden hover:cursor-pointer rounded-3xl shadow-xl hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-shadow duration-[400ms] ease-in-out">
                                <Image
                                    src="/images/500k.png"
                                    alt="Các nhóm hàng đang ưu đãi"
                                    width={200}
                                    height={300}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </Button>
                            <Button className="bg-transparent w-full max-w-[285px] h-full max-h-[222px] rounded-none p-0 overflow-hidden hover:cursor-pointer rounded-3xl shadow-xl hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-shadow duration-[400ms] ease-in-out">
                                <Image
                                    src="/images/500k.png"
                                    alt="Các nhóm hàng đang ưu đãi"
                                    width={200}
                                    height={300}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Top deal xịn */}
                <div id="top-deals-section" className="mt-10">
                    <div className="bg-[#] w-full h-[670px] flex flex-col rounded-xl px-4">
                        <div className=" flex flex-col justify-between mt-10 md:mt-1 lg:mt-4">
                            <Image
                                src="/images/ảnh sinh viên lựa chọn.webp"
                                alt="Top Deal Sinh Viên"
                                width={900}
                                height={100}
                                className=" object-contain"
                            />
                            <div className="text-black flex gap-2 lg:ml-auto items-center justify-center mt-4 lg:mt-0">
                                <span className="text-black text-sm font-medium mb-1">Sắp xếp theo:</span>
                                <select className="rounded-full border-1 border-black px-4 py-1 text-sm bg-white">
                                    <option>Xem nhiều</option>
                                    <option>Mới nhất</option>
                                    <option>Giá thấp → cao</option>
                                </select>
                            </div>
                        </div>
                        <div className='mb-30'>
                            <ProductListSection
                                products={products}
                                relatedTags={[]}
                                formatPrice={formatPrice}
                            />
                        </div>
                    </div>
                </div>

                {/* Toàn bộ Laptop */}
                <div className='relative mt-10 sm:mt-50 w-full h-[680px] lg:h-auto bg-[#efefef] rounded-lg border-2 border-[#00868B]'>
                    <Image
                        src="/images/B2S_2025_Title_Laptop-desk.webp"
                        alt="Laptop Title"
                        width={1200}
                        height={150}
                        className="absolute bottom-155 lg:bottom-148 left-1/2 transform -translate-x-1/2 w-full max-w-[1150px] h-auto"
                    />
                    <div className="flex flex-col justify-between items-center mt-2 lg:mt-4 md:mt-2 pt-6 md:pt-10 lg:pt-15 w-full px-4">
                        <h3 className="text-2xl font-bold text-black z-10">
                            Tặng kèm balo trị giá 600k
                        </h3>
                        <div className="flex gap-2 lg:ml-auto">
                            <span className="text-black text-sm font-medium mb-1">Sắp xếp theo:</span>
                            <select className="rounded-full border px-4 py-1 text-sm">
                                <option>Xem nhiều</option>
                                <option>Mới nhất</option>
                                <option>Giá thấp → cao</option>
                            </select>
                        </div>
                    </div>
                    <div className='px-3'>
                        <ProductListSection
                            products={products}
                            relatedTags={relatedTags}
                            formatPrice={formatPrice}
                        />
                    </div>
                </div>


                {/* Trả Góp Sinh Viên */}
                <div className="items-center justify-center flex flex-wrap mt-10 gap-1 md:gap-2">
                    <Image
                        src="/images/Tra_Gop_Sinh_Vien.webp"
                        alt="Student Installment"
                        width={400}
                        height={70}
                        className="hover:opacity-80 transition"
                    />
                    <div className='flex flex-row gap-1 md:gap-2'>
                        <a href="/duong-dan-can-den">
                            <Image
                                src="/images/đặc quyền trả góp.webp"
                                alt="Installment Privilege"
                                width={610}
                                height={100}
                                className="hover:opacity-80 transition"
                            />
                        </a>
                        <a href="/duong-dan-can-den">
                            <Image
                                src="/images/đặc quyền trả góp.webp"
                                alt="Installment Privilege"
                                width={610}
                                height={100}
                                className="hover:opacity-80 transition"
                            />
                        </a>
                    </div>
                    <div className='flex flex-col gap-1 md:gap-2'>
                        <a href="/duong-dan-can-den">
                            <Image
                                src="/images/đăng kí student.webp"
                                alt="Student Registration"
                                width={1300}
                                height={150}
                                className="hover:opacity-80 transition"
                            />
                        </a>
                        <a href="/duong-dan-can-den">
                            <Image
                                src="/images/đăng kí student.webp"
                                alt="Student Registration"
                                width={1300}
                                height={150}
                                className="hover:opacity-80 transition"
                            />
                        </a>
                    </div>
                </div>

                {/* Thương hiệu đồng hành */}
                <div className='mt-10'>
                    <div className='flex flex-col items-center'>
                        <Image
                            src="/images/Thuong_Hieu_Dong_Hanh.webp"
                            alt="Partner Brands"
                            width={500}
                            height={70}
                            className="hover:opacity-80 transition"
                        />
                    </div>
                    <div className='rounded-2xl border-2 border-[#00868B]'>
                        <Image
                            src="/images/Cac_Thuong_Hieu_Dong_Hanh.webp"
                            alt="Partner Brands Icons"
                            width={1200}
                            height={150}
                            className="w-full h-full object-cover rounded-xl"
                            priority
                        />
                    </div>
                </div>

                {/* HighlightSection */}
                <HighlightSection slug="slug" />
                {/* QASection */}
                <QASection />
            </div>
        </div>
    );
}