import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Component con hiển thị một tài khoản liên kết (ví dụ: Google, Zalo)
const LinkedAccountItem = ({ name, logo, isLinked }: { name: string, logo: string, isLinked: boolean }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <img src={logo} alt={name} className="w-8 h-8" />
            <span>Tài khoản {name}</span>
        </div>
        {/* Hiển thị trạng thái hoặc nút liên kết tùy thuộc vào isLinked */}
        {isLinked ? (
            <span className="text-green-600 font-semibold">Đã liên kết</span>
        ) : (
            <button className="border border-gray-300 px-4 py-1 rounded-md hover:bg-gray-100">Liên kết</button>
        )}
    </div>
);


export function LinkedAccountsCard() {
    // Dữ liệu mẫu
    const accounts = [
        {
            name: "Google",
            logo: "/images/auth/logo_google.png",
            isLinked: true
        },
    ];

    return (
        <Card className="bg-white w-full md:w-1/2 rounded-xl">
            <CardHeader className="py-0 flex w-full justify-between items-center">
                <h2 className="text-base font-bold text-black">Tài khoản liên kết</h2>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4 text-black">
                {accounts.map(account => (
                    <LinkedAccountItem key={account.name} {...account} />
                ))}
            </CardContent>
        </Card>
    );
} 