import { Card, CardHeader, CardContent } from "../ui/card";
import { UserCircle } from "lucide-react";

interface MemberCardProps {
    bgImage: string;
    title: string;
    name?: string;
    amount?: string;
    target?: string;
    updateInfo?: string;
    needMore?: string;
    locked?: boolean;
    highlight?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    selected?: boolean;
  }
  
  const MemberCard: React.FC<MemberCardProps> = ({
    bgImage,
    title,
    name,
    amount,
    target,
    updateInfo,
    needMore,
    children,
    onClick,
    selected,
  }) => (
    <Card
      className={`rounded-[24px] relative overflow-hidden transition-all duration-200 h-[120px] shadow-[0_0_32px_0_rgba(0,0,0,0.06),0_4px_20px_-8px_rgba(0,0,0,0.11)] p-0 cursor-pointer ${selected ? 'border-2 border-red-500 ring-2 ring-red-200' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <img
        alt="bg-card"
        title="bg-card"
        loading="lazy"
        width={648}
        height={200}
        className="w-full h-full object-cover absolute top-0 left-0 z-0 select-none pointer-events-none"
        src={bgImage}
        style={{ color: "transparent" }}
      />
      <div className="relative w-full flex flex-col justify-between bg-transparent z-10 h-full">
        <CardHeader className="rounded-br-full border-b border-b-neutral-200 py-1 min-w-[130px] w-fit uppercase flex justify-center items-center font-bold pl-6 pr-10 bg-blend-soft-light mix-blend-hard-light bg-gradient-to-r from-[#85878D] to-[#5D5C62] text-white text-sm">
          {title}
        </CardHeader>
        <CardContent className="w-full flex-1 flex flex-col gap-2 justify-end px-4 py-2 text-neutral-800">
          {name && (
            <div className="flex gap-2 items-center">
              <UserCircle className="w-6 h-6 shrink-0 text-[#ad9c9d]" />
              <span className="text-sm font-bold">{name}</span>
            </div>
          )}
          {amount && target && (
            <div className="w-full text-sm">
              Đã mua <strong>{amount}</strong>/<span>{target}</span>
            </div>
          )}
          {children}
          {updateInfo && (
            <div className="text-xs mt-1 text-[#ad9c9d]">{updateInfo}</div>
          )}
          {needMore && (
            <div className="text-xs mt-1">
              {needMore}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
  export default MemberCard;