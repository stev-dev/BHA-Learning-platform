import { ReactNode } from "react";

interface StatCardProps {
  color: "green" | "yellow" | "red";
  icon: ReactNode;
  label: string;
  value: number;
}

const colorMap = {
  green: {
    bg: "from-green-50 to-green-100",
    ring: "ring-green-100",
    iconBg: "bg-green-100 text-green-500",
    text: "text-green-600",
  },
  yellow: {
    bg: "from-yellow-50 to-yellow-100",
    ring: "ring-yellow-100",
    iconBg: "bg-yellow-100 text-yellow-500",
    text: "text-yellow-600",
  },
  red: {
    bg: "from-red-50 to-red-100",
    ring: "ring-red-100",
    iconBg: "bg-red-100 text-red-500",
    text: "text-red-600",
  },
};

export const StatCard = ({ color, icon, label, value }: StatCardProps) => {
  const c = colorMap[color];
  return (
    <div
      className={`
        group
        flex items-center gap-4 rounded-2xl p-6 shadow
        bg-gradient-to-br ${c.bg}
        transition-transform duration-200 hover:scale-105 hover:shadow-xl cursor-pointer
        ring-1 ${c.ring}
      `}
    >
      <div className={`rounded-full p-3 ${c.iconBg} transition-all duration-200 group-hover:scale-110`}>
        {icon}
      </div>
      <div>
        <div className={`text-3xl font-extrabold ${c.text}`}>{value}</div>
        <div className="text-base font-medium text-gray-500">{label}</div>
      </div>
    </div>
  );
};