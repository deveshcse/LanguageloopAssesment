import Link from "next/link";

export default async function PrivatePage() {
    return (
      <p className="flex  flex-col gap-10 items-center justify-between p-24">
        Hello at private page
        <Link href="/documents">documents</Link>
        <Link href="/settings">settings</Link>
        <Link href="/posts">posts</Link>
        <Link href="/dashboard">dashboard</Link>
        <Link href="/report">Report</Link>
        <Link href="/settings">settings</Link>
      </p>
    );
  }