export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\[.*?\]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function calculateReadingTime(post: {
  title: string;
  header: string;
  header_desc: string[];
  body: string[];
  body2: string[];
  summary: string[];
  ref: string[];
}): number {
  const text = [
    post.title,
    post.header,
    ...post.header_desc,
    ...post.body,
    ...post.body2,
    ...post.summary,
    ...post.ref,
  ].join(" ");

  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 90));
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  const datePart = date.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${datePart} ${h}.${m}`;
}

export function getPostBadge(title: string): string | null {
  const match = title.match(/^\[(.*?)\]/);
  return match ? match[1] : null;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
