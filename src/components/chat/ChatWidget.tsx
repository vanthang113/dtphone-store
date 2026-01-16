'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Menu,
    X,
    ThumbsUp,
    Paperclip,
    Smile,
} from 'lucide-react';

interface ChatWidgetProps {
    onClose: () => void;
}

const ChatWidget = ({ onClose }: ChatWidgetProps) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Mock data cho lịch sử trò chuyện
    const messages = [
        {
            id: 1,
            sender: 'agent',
            content:
                'Nhanh tay lên đời iPhone 16 Series để được trợ giá ĐẾN 4 TRIỆU. Tham khảo giá nhập cũ và lên đời ngay tại <a href="https://cellphones.com.vn/thu-cu-doi-moi" target="_blank" className="text-blue-500 underline">https://cellphones.com.vn/thu-cu-doi-moi</a>',
            timestamp: '6/17/2025, 9:08:00 PM',
        },
        {
            id: 2,
            sender: 'user',
            content: '👍',
            timestamp: '6/17/2025, 9:08:05 PM',
        },
        {
            id: 3,
            sender: 'agent',
            content:
                'Xin chào quý khách!<br/>Kết nối với Zalo CellphoneS tại <a href="https://bit.ly/Zalo_CPS" target="_blank" className="text-blue-500 underline">https://bit.ly/Zalo_CPS</a> để được tư vấn và phục vụ nhanh chóng!',
            timestamp: '6/17/2025, 9:08:10 PM',
            menu: [
                'Tư vấn sản phẩm',
                'Kiểm tra thông tin',
                'Chat Zalo',
                'Gặp tư vấn viên',
            ],
        },
        {
            id: 4,
            sender: 'user',
            content: 'Kiểm tra thông tin',
            timestamp: '6/17/2025, 9:08:15 PM',
        },
        {
            id: 5,
            sender: 'user',
            content: 'Tư vấn sản phẩm',
            timestamp: '6/17/2025, 9:08:20 PM',
        },
        {
            id: 6,
            sender: 'agent',
            content: 'Dạ CellphoneS xin chào anh Lộc Trần Trân',
            timestamp: '6/17/2025, 9:08:25 PM',
        },
        {
            id: 7,
            sender: 'agent',
            content: 'Dạ không biết mình cần em hỗ trợ gì ạ',
            timestamp: '6/17/2025, 9:08:30 PM',
        },
    ];

    const handleSendMessage = (e: any) => {
        e.preventDefault();
        if (message.trim()) {
            console.log('Gửi tin nhắn:', message);
            setMessage('');
            // TODO: Tích hợp API để gửi tin nhắn
        }
    };

    const handleFileUpload = (e: any) => {
        console.log('Tệp được tải lên:', e.target.files[0]);
        // TODO: Xử lý tải tệp lên
    };

    const handleMenuItemClick = (item: any) => {
        console.log('Chọn menu:', item);
        setIsMenuOpen(false);
        // TODO: Xử lý hành động menu
    };

    if (isMinimized) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 bg-primary-500 text-white hover:bg-primary-600"
                onClick={() => setIsMinimized(false)}
            >
                <Smile className="h-6 w-6" />
            </Button>
        );
    }

    return (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 z-50 w-full sm:w-[400px] bg-white sm:rounded-lg shadow-lg flex flex-col h-full sm:h-[500px] sm:max-h-[80vh]">
            {/* Header: Thông tin tư vấn viên và nút hành động */}
            <div className="flex justify-between items-center p-4 border-b bg-[#00868B] text-white">
                <div className="flex items-center gap-3 ">
                    <Avatar className="w-10 h-10">
                        <AvatarImage
                            src="/images/chibi_head.png"
                            alt="Hồng Vân.CTV_CellphoneS"
                        />
                        <AvatarFallback>HV</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm">Hồng Vân.CTV_CellphoneS</p>
                        <p className="text-xs">Chat trực tiếp tại Website</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        aria-label="Close chat"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Menu hành động (hiển thị khi mở) */}
            {isMenuOpen && (
                <div className="absolute top-16 right-4 bg-white shadow-md rounded-md w-48">
                    <ul className="py-1">
                        {['Tư vấn sản phẩm', 'Kiểm tra thông tin', 'Chat Zalo', 'Gặp tư vấn viên'].map(
                            (item) => (
                                <li key={item}>
                                    <Button
                                        variant="ghost"
                                        className="w-full text-left px-4 py-2 text-sm"
                                        onClick={() => handleMenuItemClick(item)}
                                    >
                                        {item}
                                    </Button>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}

            {/* Nội dung trò chuyện */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col gap-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'
                            }`}
                    >
                        <div
                            className={`flex items-start gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''
                                }`}
                        >
                            {msg.sender === 'agent' && (
                                <Avatar className="w-8 h-8 flex-shrink-0">
                                    <AvatarImage src="/images/chibi_head.png" alt="Agent" />
                                    <AvatarFallback>HV</AvatarFallback>
                                </Avatar>
                            )}
                            <div
                                className={`p-3 rounded-lg text-sm ${msg.sender === 'user'
                                    ? 'bg-primary-100 text-primary-800'
                                    : 'bg-neutral-100 text-neutral-800'
                                    }`}
                                dangerouslySetInnerHTML={{ __html: msg.content }}
                            />
                        </div>
                        {msg.sender === 'agent' && msg.menu && (
                            <div className="mt-2 w-full max-w-[80%]">
                                <ul className="space-y-1">
                                    {msg.menu.map((item) => (
                                        <li key={item}>
                                            <Button
                                                variant="outline"
                                                className="w-full text-left text-sm py-2"
                                                onClick={() => handleMenuItemClick(item)}
                                            >
                                                {item}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {msg.sender === 'agent' && (
                            <div className="text-xs text-neutral-500 flex gap-1">
                                <span>Hồng Vân.CTV_CellphoneS</span>
                                <span>·</span>
                                <span>{msg.timestamp}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer: Input tin nhắn và nút */}
            <div className="p-4 border-t">
                <div className=" text-[#00868B] flex items-center gap-2">
                    <Textarea
                        placeholder="Nhập nội dung…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={1000}
                        className="flex-1 min-h-[40px] text-sm resize-none"
                    />
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Thumb survey"
                            onClick={() => console.log('Thumb survey clicked')}
                        >
                            <ThumbsUp className="h-5 w-5" />
                        </Button>
                        <label htmlFor="file-upload">
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*,video/*,audio/*,.doc,.docx,.txt,.rtf,.pdf,.xls,.xlsx,.csv"
                                className="hidden "
                                onChange={handleFileUpload}
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                aria-label="Upload file"
                            >
                                <span>
                                    <Paperclip className="h-5 w-5" />
                                </span>
                            </Button>
                        </label>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Emoji picker"
                            onClick={() => console.log('Emoji picker clicked')}
                        >
                            <Smile className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className="mt-2 text-center text-xs text-neutral-500">
                    <Link href="#" className="hover:underline">
                        Powered by CareSoft
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ChatWidget; 