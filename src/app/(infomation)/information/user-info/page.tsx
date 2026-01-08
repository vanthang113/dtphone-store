import { AddressCard } from "@/components/information/user-info/AddressCard";
import { LinkedAccountsCard } from "@/components/information/user-info/LinkedAccountsCard";
import { PasswordCard } from "@/components/information/user-info/PasswordCard";
import { PersonalInfoCard } from "@/components/information/user-info/PersonalInfoCard";


export default function UserInfoPage() {
    return (
        <div className="flex-auto min-w-0 space-y-4">
            {/* Component hiển thị và chỉnh sửa thông tin cá nhân */}
            <PersonalInfoCard />
            {/* Component quản lý sổ địa chỉ */}
            <AddressCard />
            <div className="flex flex-col md:flex-row gap-4">
                {/* Component thay đổi mật khẩu */}
                <PasswordCard />
                {/* Component quản lý các tài khoản mạng xã hội đã liên kết */}
                <LinkedAccountsCard />
            </div>
        </div>
    )
}