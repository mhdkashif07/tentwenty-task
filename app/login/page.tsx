"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    setLoading(false);
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full px-16">
          <form
            className="max-w-md mx-auto"
            onSubmit={handleSubmit}
            data-test-id="login-form"
          >
            <h2 className="text-xl font-bold text-gray mb-6">Welcome back</h2>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              className="w-full border border-border rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              aria-label="email"
            />

            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-border rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              aria-label="password"
            />

            <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" /> Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md shadow-md disabled:opacity-60"
              disabled={loading}
              data-test-id="login-submit"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {error && <p className="text-red-600 mt-3">{error}</p>}
          </form>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-panelhero">
        <div className="text-light-gray max-w-xl ">
          <h1 className="text-[40px] font-normal tracking-tight">ticktock</h1>
          <p className="mt-6 font-normal text-base leading-relaxed">
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours. With
            ticktock, you can effortlessly track and monitor employee attendance
            and productivity from anywhere, anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
