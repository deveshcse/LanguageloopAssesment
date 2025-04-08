'use client';

import dynamic from "next/dynamic";

// Lazy load the client component
const TaskPageClient = dynamic(() => import("./TaskPageClient"), {
  ssr: false, // <-- THIS is the key to avoid useSearchParams() errors
});

export default function TasksPage() {
  return <TaskPageClient />;
}
