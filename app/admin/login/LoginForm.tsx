"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type LoginFormState = {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
};

export function LoginForm() {
  const router = useRouter();
  const [state, setState] = useState<LoginFormState>({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !data.success) {
        setState((prev) => ({
          ...prev,
          error: data.message || "Invalid email or password.",
          loading: false,
        }));
        return;
      }

      router.push("/admin");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Something went wrong. Please try again.",
        loading: false,
      }));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-muted-foreground"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={state.email}
          onChange={(event) =>
            setState((prev) => ({
              ...prev,
              email: event.target.value,
            }))
          }
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-muted-foreground"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={state.password}
          onChange={(event) =>
            setState((prev) => ({
              ...prev,
              password: event.target.value,
            }))
          }
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="••••••••"
        />
      </div>

      {state.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={state.loading}
        className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
