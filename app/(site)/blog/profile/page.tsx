import Link from "next/link";
import { logoutAction } from "@/app/auth/actions";
import ProfileForm from "@/app/components/blog/ProfileForm";
import { isAdminUser, requireUser } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profiles";

export default async function ProfilePage() {
  const user = await requireUser();
  const profile = await getOrCreateProfile(user.id, user.email ?? "");
  const isAdmin = isAdminUser(user);

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">โปรไฟล์</h1>
          <p className="mt-1 text-sm text-muted">จัดการข้อมูลบัญชีของคุณ</p>
        </div>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link href="/blog/manage" className="btn-secondary text-sm">
              จัดการโพสต์
            </Link>
          )}
          <form action={logoutAction}>
            <button type="submit" className="btn-secondary text-sm">
              ออกจากระบบ
            </button>
          </form>
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
