"use client";

import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { useRegister } from "@/hooks/useRegister";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const {
    register: registerUser,
    isPending: isLoading,
    error,
  } = useRegister();

  const {
    loginWithGoogle,
    error: googleError,
  } = useGoogleAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  return (
    <div className="w-full max-w-md">
      {/* Heading */}
      <div className="mb-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Join the baker&apos;s circle
        </p>

        <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          Create your account
        </h2>

        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          Save preferences, reserve morning bakes, and track your artisanal
          deliveries.
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
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {googleError.message ||"something went wrong"}
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

      {/* API error */}
      {error && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="mt-0.5">!</span>
          <p>{error.message || "something went wrong"}</p>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit(registerUser)}
        className="space-y-5 flex flex-col gap-3"
        noValidate
      >
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-semibold text-foreground"
          >
            Full name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            {...register("name", {
              required: "Name is required",
            })}
            className={`h-11 w-full rounded-xl border bg-input px-4 text-sm text-foreground
              placeholder:text-muted-foreground/60
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-ring/20
              ${
                errors.name
                  ? "border-red-400 focus:border-red-400"
                  : "border-border focus:border-ring"
              }`}
          />

          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

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
            className={`h-11 w-full rounded-xl border bg-input px-4 text-sm text-foreground
              placeholder:text-muted-foreground/60
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-ring/20
              ${
                errors.email
                  ? "border-red-400 focus:border-red-400"
                  : "border-border focus:border-ring"
              }`}
          />

          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Passwords */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-semibold text-foreground"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className={`h-11 w-full rounded-xl border bg-input px-4 text-sm text-foreground
                placeholder:text-muted-foreground/50
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-ring/20
                ${
                  errors.password
                    ? "border-red-400"
                    : "border-border focus:border-ring"
                }`}
            />

            {errors.password && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-xs font-semibold text-foreground"
            >
              Confirm password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords don't match",
              })}
              className={`h-11 w-full rounded-xl border bg-input px-4 text-sm text-foreground
                placeholder:text-muted-foreground/50
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-ring/20
                ${
                  errors.confirmPassword
                    ? "border-red-400"
                    : "border-border focus:border-ring"
                }`}
            />

            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl cursor-pointer
            bg-primary px-5 text-sm font-semibold text-primary-foreground
            shadow-sm transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-lg
            hover:brightness-105
            disabled:pointer-events-none disabled:opacity-60"
        >
          <span>
            {isLoading ? "Creating account..." : "Create account"}
          </span>

          {!isLoading && (
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          )}
        </button>
      </form>

      {/* Login */}
      <p className="mt-7 text-center text-sm text-muted-foreground">
        Already a member?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}