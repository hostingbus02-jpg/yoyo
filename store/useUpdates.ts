"use client";

import { useState, useCallback, useEffect } from "react";
import axios from "axios";

type Update = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
};

export default function useUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);

  const load = useCallback(async () => {
    const res = await axios.get("/api/updates");
    setUpdates(res.data);
  }, []);

  const addUpdate = async (title: string, content: string) => {
    const res = await axios.post("/api/updates", { title, content });
    setUpdates(prev => [res.data, ...prev]);
    load();
  };

  const editUpdate = async (id: number, title: string, content: string) => {
    const res = await axios.put(`/api/updates/${id}`, { title, content });
    setUpdates(prev => prev.map(u => (u.id === id ? res.data : u)));
    load();
  };

  const deleteUpdate = async (id: number) => {
    await axios.delete(`/api/updates/${id}`);
    setUpdates(prev => prev.filter(u => u.id !== id));
    load();
  };

  useEffect(() => {
    load();
  }, [load]);

  return { updates, load, addUpdate, editUpdate, deleteUpdate };
}
