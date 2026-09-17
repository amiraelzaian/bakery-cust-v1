'use client'

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { useResetPassword } from "@/hooks/useAuth"
import Logo from "../ui/Logo"

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email") ?? ""

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formError, setFormError] = useState(null)

  const { resetNewPassword, isPending, error } = useResetPassword()

  function handleSubmit(e) {
    e.preventDefault()
    setFormError(null)

    if (newPassword.length < 6) {
      setFormError("Password must be at least 6 characters.")
      return
    }

    if (newPassword !== confirmPassword) {
      setFormError("Passwords do not match.")
      return
    }

    resetNewPassword({ email, newPassword })
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
            Set new password
          </p>
          <h1 className="mt-2 text-2xl font-bold text-card-foreground">
            Reset your password
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {email
              ? <>Create a new password for <span className="font-medium text-card-foreground">{email}</span>.</>
              : "Create a new password for your account."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                New password
              </span>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label={showNew ? "Hide password" : "Show password"}
                >
                  {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                Confirm new password
              </span>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repeat new password"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Resetting..." : "Reset password"}
            </button>

            {(formError || error) && (
              <p className="text-center text-sm text-destructive">
                {formError || error?.message}
              </p>
            )}
          </form>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            Back to sign in
          </button>
        </div>
      </div>
    </div>
  )
}