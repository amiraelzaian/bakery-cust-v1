"use client";

import { useState } from "react";
import { useForgotPassword } from "@/hooks/useAuth";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { useLogin } from "@/hooks/useLogin";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { login: onSubmit, isLoading, error } = useLogin();

  const { loginWithGoogle, error: googleError } = useGoogleAuth();

  const {
    forgotPassword,
    isPending: isSendingCode,
    error: forgotPasswordError,
  } = useForgotPassword();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = watch("email");

  const handleForgotPassword = async () => {
    const isEmailValid = await trigger("email");

    if (!isEmailValid) return;

    forgotPassword({ email });
  };

  return (
    <div className="w-full max-w-md">
      {/* Heading */}
      <div className="mb-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Welcome back
        </p>

        <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          Sign in to Golden Crumbs
        </h2>

        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          Access your saved baskets, recurring deliveries, and artisanal
          orders.
        </p>
      </div>

      {/* Google */}
      <div className="overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-sm">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              loginWithGoogle(credentialResponse.credential);
            }
          }}
          onError={() => console.error("Google login failed")}
          width="100%"
        />
      </div>

      {googleError && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
          {googleError}
        </div>
      )}

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />

        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          or continue with email
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Login error */}
      {error && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="mt-0.5">!</span>
          <p>{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 flex flex-col gap-3"
        noValidate
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-semibold text-foreground"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address",
              },
            })}
            className={`h-12 w-full rounded-xl border bg-input px-4 text-sm text-foreground
              placeholder:text-muted-foreground/60
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-ring/20
              ${
                errors.email
                  ? "border-red-400"
                  : "border-border focus:border-ring"
              }`}
          />

          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-foreground"
            >
              Password
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isSendingCode}
              className="text-xs font-medium text-primary transition-colors hover:text-primary/70 disabled:opacity-50"
            >
              {isSendingCode ? "Sending..." : "Forgot password?"}
            </button>
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
              })}
              className={`h-12 w-full rounded-xl border bg-input px-4 pr-11 text-sm text-foreground
                placeholder:text-muted-foreground/50
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-ring/20
                ${
                  errors.password
                    ? "border-red-400"
                    : "border-border focus:border-ring"
                }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}

          {forgotPasswordError && (
            <p className="mt-2 text-xs text-red-600">
              {forgotPasswordError.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl
            bg-primary px-5 text-sm font-semibold text-primary-foreground
            shadow-sm transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-lg
            hover:brightness-105
            disabled:pointer-events-none disabled:opacity-60"
        >
          <span>{isLoading ? "Signing in..." : "Sign in to account"}</span>

          {!isLoading && (
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          )}
        </button>
      </form>

      {/* Register */}
      <p className="mt-7 text-center text-sm text-muted-foreground">
        New customer at Golden Crumbs?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}