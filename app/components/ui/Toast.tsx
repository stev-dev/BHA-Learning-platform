import { CheckCircle, XCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
}

export const Toast = ({ message, type = "success" }: ToastProps) => {
  const Icon = type === "success" ? CheckCircle : XCircle;
  const color = type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";

  return (
    <div className={`flex items-center gap-2 rounded-lg p-4 text-sm ${color}`}>
      <Icon className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
};
