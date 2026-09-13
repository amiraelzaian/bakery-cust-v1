"use client";

import { useLogin } from "@/hooks/useLogin";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginForm() {
const { login:onSubmit, isLoading, error } = useLogin();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  
  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="text-xs text-[#B8734A]">Welcome back</p>
      <h2 className="font-serif text-3xl mt-1 text-[#2A1D14]">Sign in to Maison Farine</h2>
      <p className="text-sm text-[#8A7A68] mt-2">
        Access your saved baskets, recurring deliveries, and artisanal orders.
      </p>

      <button
        type="button"
        className="mt-6 w-full border border-[#E4D9CB] rounded-md py-2.5 text-sm font-medium
                   flex items-center justify-center gap-2 hover:bg-[#F7F2EA] transition-colors"
      >
        Continue with Google
      </button>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-[#E4D9CB]" />
        <span className="text-xs text-[#9C8B78]">or continue with email</span>
        <div className="h-px flex-1 bg-[#E4D9CB]" />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="text-xs font-medium text-[#6B5D4E]">
            Email address
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 w-full border border-[#E4D9CB] rounded-md px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#D9A15B] focus:border-transparent"
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-medium text-[#6B5D4E]">
              Password
            </label>
            <a href="/forgot-password" className="text-xs text-[#B8734A] hover:underline">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="mt-1 w-full border border-[#E4D9CB] rounded-md px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#D9A15B] focus:border-transparent"
          />
          {errors.password && (
            <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

       

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#2A1D14] text-[#F4EDE4] rounded-md py-2.5 text-sm font-medium
                     hover:bg-[#3A2A1C] transition-colors disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign in to account"}
        </button>
      </form>

      <p className="text-center text-sm text-[#8A7A68] mt-6">
        New customer at Maison Farine?{" "}
        <Link
          href="/register"
          className="text-[#B8734A] font-medium hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}