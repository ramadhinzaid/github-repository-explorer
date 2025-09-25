import type { LucideProps } from "lucide-react";
import type ErrorType from "../types/ErrorType";

export function ErrorCard({ error }: { error: ErrorType }) {
  return <div>{error.message}</div>;
}

export function MessageCard({
  message,
  icon: Icon,
}: {
  message: string;
  icon: React.FC<LucideProps>;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Icon className="text-blue-500" size={42} />
      <p className="mt-3 font-medium text-gray-500">{message}</p>
    </div>
  );
}
