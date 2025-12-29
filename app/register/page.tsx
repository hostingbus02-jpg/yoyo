"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState("");

  async function register(){
    setLoading(true);
    const res = await fetch("/api/register",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ email,password:pass })
    });
    const data = await res.json();
    setLoading(false);

    if(data.success){
      setMsg("Registered ✔ Redirecting to login...");
      setTimeout(()=> location.href="/login", 1200);
    } else setMsg(data.error || "Failed");
  }

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="bg-neutral-900 p-8 rounded-lg w-96 text-white space-y-4">
        <h2 className="text-center font-bold text-2xl">Register</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)}
          placeholder="Email" className="p-3 rounded w-full bg-neutral-800"/>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)}
          placeholder="Password" className="p-3 rounded w-full bg-neutral-800"/>
        <button onClick={register}
          className="bg-yellow-500 w-full p-3 rounded font-bold">
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-center text-sm">{msg}</p>
        <p className="text-center text-sm opacity-70">
          Already have account? <a href="/login" className="underline">Login</a>
        </p>
      </div>
    </div>
  );
}
