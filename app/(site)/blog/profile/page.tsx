import Link from "next/link";
import LogoutButton from "@/app/components/auth/LogoutButton";
import ProfileForm from "@/app/components/blog/ProfileForm";
import { isAdminUser, requireUser } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profiles";

export default async function ProfilePage() {
  const user = await requireUser();
  const profile = await getOrCreateProfile(user.id, user.email ?? "");
  const isAdmin = isAdminUser(user);

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">โปรไฟล์</h1>
          <p className="mt-1 text-sm text-muted">จัดการข้อมูลบัญชีของคุณ</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {isAdmin && (
            <Link href="/blog/manage" className="btn-secondary w-full text-center text-sm sm:w-auto">
              จัดการโพสต์
            </Link>
          )}
          <LogoutButton
            formClassName="w-full sm:w-auto"
            className="btn-secondary w-full text-sm sm:w-auto"
          />
        </div>
      </div>

      <ProfileForm profile={profile} isAdmin={isAdmin} />

      {!isAdmin && (
        <p className="mt-6 text-center text-sm text-muted">
          บัญชีผู้ใช้ทั่วไป — สามารถอ่านบล็อกและแสดงความคิดเห็นได้
        </p>
      )}
    </div>
  );
}
