import { Loader2 } from "lucide-react";

export const Spinner = () => (
  <div className="flex items-center justify-center">
    <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
  </div>
);
