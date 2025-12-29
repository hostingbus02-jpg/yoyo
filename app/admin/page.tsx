"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [updates, setUpdates] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  async function fetchUpdates() {
    const res = await fetch("/api/updates");
    const data = await res.json();
    setUpdates(data);
  }

  useEffect(() => {
    // Check authentication
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/check");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchUpdates();
        } else {
          setIsAuthenticated(false);
          router.push("/login");
        }
      } catch (error) {
        setIsAuthenticated(false);
        router.push("/login");
      }
    }
    checkAuth();
  }, [router]);

  async function submit() {
    const res = await fetch("/api/updates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert("Update Added!");
      setTitle("");
      setContent("");
      fetchUpdates();
    } else {
      alert("Failed to add update");
    }
  }

  if (isAuthenticated === null) {
    return (
      <div style={{ padding: 40 }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null; // Will redirect
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 36, fontWeight: "bold" }}>Admin Panel 🔥</h1>

      <input
        placeholder="Update title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: 300, padding: 10, marginTop: 20, display: "block" }}
      />

      <textarea
        placeholder="Update message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: 300, height: 100, padding: 10, marginTop: 10, display: "block" }}
      />

      <button
        onClick={submit}
        style={{
          background: "gold",
          padding: "12px 20px",
          marginTop: 10,
          borderRadius: 8,
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Add Update
      </button>

      <h2 style={{ marginTop: 40, fontSize: 28 }}>Existing Updates</h2>

      <div>
        {updates.map((u) => (
          <div key={u.id} style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
            <b>{u.title}</b>
            <p>{u.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
