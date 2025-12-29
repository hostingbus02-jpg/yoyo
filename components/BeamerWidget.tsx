"use client";
import { useEffect, useState } from "react";
import useUpdates from "@/store/useUpdates";

export default function BeamerWidget() {
  const { updates, load } = useUpdates();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    load(); // fetch updates when popup opens
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-yellow-500 text-black p-3 rounded-full font-bold"
      >
        🔔
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white text-black p-6 rounded w-96 relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4">Latest Updates</h2>

            {updates.length === 0 ? (
              <p>No updates yet.</p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {updates.map((u: any) => (
                  <div key={u.id} className="border p-3 rounded">
                    <b>{u.title}</b>
                    <p>{u.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}