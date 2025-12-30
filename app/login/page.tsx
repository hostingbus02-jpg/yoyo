"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include", // Important: include cookies
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    setLoading(false);

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    alert("Login Successful!");
    window.location.href = "/admin";
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="bg-neutral-900 p-8 rounded-lg w-96 text-white space-y-4">
        <h2 className="text-center font-bold text-2xl">Login</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-3 rounded w-full bg-neutral-800"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 rounded w-full bg-neutral-800"
        />
        <button
          onClick={submit}
          disabled={loading}
          className="bg-yellow-500 w-full p-3 rounded font-bold disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm text-gray-300">
          <a href="/register" className="underline">Create account</a>
        </p>
      </div>
    </div>
  );
}
