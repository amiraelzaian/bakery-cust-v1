"use client";

import { useRegister } from "@/hooks/useRegister";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
const { register:onSubmit, isPending: isLoading, error } = useRegister();


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
    <div className="w-full max-w-sm mx-auto">
      <p className="text-xs text-[#B8734A]">Join the baker&apos;s circle</p>
      <h2 className="font-serif text-3xl mt-1 text-[#2A1D14]">Create your account</h2>
      <p className="text-sm text-[#8A7A68] mt-2">
        Save preferences, reserve morning bakes, and track deliveries.
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
          <label htmlFor="name" className="text-xs font-medium text-[#6B5D4E]">
            Full name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className="mt-1 w-full border border-[#E4D9CB] rounded-md px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#D9A15B] focus:border-transparent"
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
        </div>

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
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
        </div>

        {/* <div>
          <label htmlFor="phone" className="text-xs font-medium text-[#6B5D4E]">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+20 1xx xxx xxxx"
            {...register("phone", { required: "Phone number is required" })}
            className="mt-1 w-full border border-[#E4D9CB] rounded-md px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#D9A15B] focus:border-transparent"
          />
          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
        </div> */}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="password" className="text-xs font-medium text-[#6B5D4E]">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              className="mt-1 w-full border border-[#E4D9CB] rounded-md px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#D9A15B] focus:border-transparent"
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="passwordConfirm" className="text-xs font-medium text-[#6B5D4E]">
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              {...register("passwordConfirm", {
                required: "Confirm your password",
                validate: (value) => value === password || "Passwords don't match",
              })}
              className="mt-1 w-full border border-[#E4D9CB] rounded-md px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#D9A15B] focus:border-transparent"
            />
            {errors.passwordConfirm && (
              <p className="text-xs text-red-600 mt-1">{errors.passwordConfirm.message}</p>
            )}
          </div>
        </div>

       
        <button   
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#2A1D14] text-[#F4EDE4] rounded-md py-2.5 text-sm font-medium
                     hover:bg-[#3A2A1C] transition-colors disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-center text-sm text-[#8A7A68] mt-6">
        Already a member?{" "}
        <Link
          href="/login"
          className="text-[#B8734A] font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}