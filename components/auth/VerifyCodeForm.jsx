"use client";

import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

export default function VerifyCodeForm({ onSubmit, isLoading, error, onResend, isResending }) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { code: "" },
  });

  const submitHandler = (data) => {
    onSubmit?.({ ...data, email });
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="text-xs text-[#B8734A]">Check your inbox</p>
      <h2 className="font-serif text-3xl mt-1 text-[#2A1D14]">Enter verification code</h2>
      <p className="text-sm text-[#8A7A68] mt-2">
        We sent a 6-digit code to{" "}
        {email ? <span className="font-medium text-[#2A1D14]">{email}</span> : "your email"}.
        Enter it below to continue.
      </p>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mt-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 mt-6" noValidate>
        <div>
          <label htmlFor="code" className="text-xs font-medium text-[#6B5D4E]">
            Verification code
          </label>
          <input
            id="code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            {...register("code", {
              required: "Enter the code sent to your email",
              pattern: { value: /^\d{6}$/, message: "Code must be 6 digits" },
            })}
            className="mt-1 w-full border border-[#E4D9CB] rounded-md px-3 py-2 text-center text-lg
                       tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-[#D9A15B] focus:border-transparent"
          />
          {errors.code && (
            <p className="text-xs text-red-600 mt-1">{errors.code.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#2A1D14] text-[#F4EDE4] rounded-md py-2.5 text-sm font-medium
                     hover:bg-[#3A2A1C] transition-colors disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify code"}
        </button>
      </form>

      <p className="text-center text-sm text-[#8A7A68] mt-6">
        Didn&apos;t get a code?{" "}
        <button
          type="button"
          onClick={() => onResend?.(email)}
          disabled={isResending}
          className="text-[#B8734A] font-medium hover:underline disabled:opacity-50"
        >
          {isResending ? "Resending..." : "Resend code"}
        </button>
      </p>
    </div>
  );
}