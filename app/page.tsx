"use client";

import useUpdates from "@/store/useUpdates";
import BeamerWidget from "@/components/BeamerWidget";

export default function Home() {
  const { updates } = useUpdates();

  return (
    <main className="min-h-screen p-10 text-white">
      <h1 className="text-3xl font-bold">Latest Updates 🔥</h1>

      <div className="mt-6 space-y-4">
        {updates.length === 0 && <p>No updates yet. Add some from /admin</p>}
        {updates.map((u)=>(
          <div key={u.id} className="border p-3 rounded bg-gray-900">
            <h2 className="font-bold">{u.title}</h2>
            <p className="text-gray-400">{u.content}</p>
          </div>
        ))}
      </div>

      <BeamerWidget updates={updates} />
    </main>
  );
}
