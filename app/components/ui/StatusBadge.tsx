interface StatusBadgeProps {
  status: "Published" | "Pending" | "Rejected";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const color =
    status === "Published"
      ? "bg-green-100 text-green-700"
      : status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
};