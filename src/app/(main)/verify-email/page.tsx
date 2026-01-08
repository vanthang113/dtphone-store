'use client';

import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function EmailVerificationPage() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'verify' | 'success'>('verify');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);

  // ✅ Lấy email từ localStorage hoặc props (tùy logic backend)
  useEffect(() => {
    const storedEmail = localStorage.getItem('email') || '';
    setEmail(storedEmail);
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Vui lòng nhập đủ 6 ký tự');
      return;
    }

    // TODO: Gọi API xác minh mã
    // const response = await fetch('/api/verify-code', { 
    //   method: 'POST', 
    //   body: JSON.stringify({ email, code }) 
    // });
    // if (!response.ok) {
    //   setError('Mã xác nhận không đúng');
    //   return;
    // }

    setError('');
    setStep('success');
  };

  const handleResend = async () => {
    setIsResending(true);
    // TODO: Gọi API gửi lại mã
    // await fetch('/api/send-verification', { method: 'POST', body: JSON.stringify({ email }) });

    setTimeout(() => {
      setIsResending(false);
      setVerificationCode(['', '', '', '', '', '']);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          {step === 'verify' && (
            <>
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-red-100 to-orange-100 p-4 rounded-full">
                    <Mail className="w-12 h-12 text-red-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Nhập mã xác nhận</CardTitle>
                <CardDescription>
                  Mã xác nhận đã được gửi đến<br />
                  <span className="font-semibold text-red-600">{email}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-center gap-2">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold"
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-red-500 text-center text-sm">{error}</p>
                )}

                <Button
                  onClick={handleVerify}
                  className="w-full h-11 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold"
                >
                  Xác nhận
                </Button>

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={handleResend}
                    disabled={isResending}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isResending ? 'animate-spin' : ''}`} />
                    {isResending ? 'Đang gửi lại...' : 'Gửi lại mã'}
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 'success' && (
            <>
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-full">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Xác nhận thành công!</CardTitle>
                <CardDescription>
                  Email của bạn đã được xác nhận thành công
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    setStep('verify');
                    setVerificationCode(['', '', '', '', '', '']);
                  }}
                  className="w-full h-11 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold"
                >
                  Hoàn tất
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
