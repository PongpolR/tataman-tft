"use client";

import { useFormStatus } from "react-dom";
import { logoutAction } from "@/app/auth/actions";
import Spinner from "@/app/components/ui/Spinner";

interface LogoutButtonProps {
  className?: string;
  formClassName?: string;
  children?: React.ReactNode;
  loadingText?: string;
}

function LogoutSubmitButton({
  className,
  children = "ออกจากระบบ",
  loadingText = "กำลังออกจากระบบ...",
}: Omit<LogoutButtonProps, "formClassName">) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Spinner size="sm" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default function LogoutButton({
  className,
  formClassName,
  children,
  loadingText,
}: LogoutButtonProps) {
  return (
    <form action={logoutAction} className={formClassName}>
      <LogoutSubmitButton className={className} loadingText={loadingText}>
        {children}
      </LogoutSubmitButton>
    </form>
  );
}
