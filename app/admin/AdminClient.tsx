"use client";

import { useState, useEffect } from "react";
import useUpdates from "@/store/useUpdates";

export default function AdminClient() {
  const { updates, addUpdate, editUpdate, deleteUpdate } = useUpdates();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [stats, setStats] = useState({ updates: 0, users: 0, lastUpdate: null as string | null });

  useEffect(() => {
    fetch("/api/stats").then(res => res.json()).then(setStats);
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await addUpdate(title, content);
    setTitle("");
    setContent("");
    // Refresh stats after adding update
    fetch("/api/stats").then(res => res.json()).then(setStats);
  };

  const startEdit = (u: any) => {
    setEditingId(u.id);
    setEditTitle(u.title);
    setEditContent(u.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const saveEdit = async (e: any, id: number) => {
    e.preventDefault();
    if (!editTitle.trim() || !editContent.trim()) {
      alert("Title and content cannot be empty");
      return;
    }
    try {
      await editUpdate(id, editTitle, editContent);
      cancelEdit();
      // Refresh stats after editing
      fetch("/api/stats").then(res => res.json()).then(setStats);
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save update");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this update?")) {
      try {
        await deleteUpdate(id);
        // Refresh stats after deleting
        fetch("/api/stats").then(res => res.json()).then(setStats);
      } catch (error) {
        console.error("Failed to delete:", error);
        alert("Failed to delete update");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <main className="min-h-screen p-10 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-2">📊 Total Updates</h3>
          <p className="text-yellow-400 text-2xl">{stats.updates}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-2">🧑 Total Users</h3>
          <p className="text-yellow-400 text-2xl">{stats.users}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-2">📅 Latest Update</h3>
          <p className="text-yellow-400 text-sm">{stats.lastUpdate ? new Date(stats.lastUpdate).toLocaleString() : "No updates yet"}</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4 max-w-xl mb-10">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Update message..."
          className="w-full p-2 rounded h-32 bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black px-4 py-2 rounded font-bold"
        >
          Add Update
        </button>
      </form>

      <div className="mt-10 space-y-3">
        <h2 className="text-xl font-bold">Existing Updates</h2>
        {updates.map((u: any) => (
          <div key={u.id} className="border p-4 rounded bg-gray-900">
            {editingId === u.id ? (
              <form onSubmit={(e) => saveEdit(e, u.id)} className="space-y-3">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  placeholder="Title"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 rounded h-24 bg-gray-800 text-white"
                  placeholder="Content"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="font-bold text-lg">{u.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{u.content}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => startEdit(u)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
