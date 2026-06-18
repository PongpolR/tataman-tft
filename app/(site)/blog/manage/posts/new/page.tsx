import PostForm from "@/app/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">สร้างโพสต์ใหม่</h1>
      <p className="mb-6 text-sm text-muted">กรอกข้อมูลหลักก่อน ส่วนเพิ่มเติมเปิดได้ตามต้องการ</p>
      <PostForm />
    </div>
  );
}
