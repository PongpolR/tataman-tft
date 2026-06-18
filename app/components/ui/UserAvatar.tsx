import Image from "next/image";

interface UserAvatarProps {
  name: string;
  avatarUrl: string | null;
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "h-8 w-8 text-sm",
  md: "h-8 w-8 text-sm",
};

function AvatarFallback({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-accent/20 font-semibold text-accent ${className}`}
    >
      {initial}
    </span>
  );
}

export default function UserAvatar({
  name,
  avatarUrl,
  size = "sm",
}: UserAvatarProps) {
  const className = sizeClasses[size];

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={32}
        height={32}
        className={`shrink-0 rounded-full object-cover ${className}`}
      />
    );
  }

  return <AvatarFallback name={name} className={className} />;
}
