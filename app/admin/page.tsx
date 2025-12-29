"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function fetchUpdates() {
    const res = await fetch("/api/updates");
    const data = await res.json();
    setUpdates(data);
  }

  useEffect(() => {
    fetchUpdates();
  }, []);

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
