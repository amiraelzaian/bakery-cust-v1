'use client'

import { useState } from "react"
import { ChevronRight, Eye, EyeOff } from "lucide-react"
import { Field } from "./FormField"
import { useAuth, useChangeUserPassword } from "@/hooks/useAuth"

export default function ChangePasswordSection() {
  const [open, setOpen] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [current, setCurrent] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [formError, setFormError] = useState(null)

  const { changeUserPassword, isPending, error } = useChangeUserPassword()
  const { data } = useAuth()
  const user = data?.data

  function handleSubmit(e) {
    e.preventDefault()
    setFormError(null)

    if (newPassword.length < 6) {
      setFormError("New password must be at least 6 characters.")
      return
    }

    if (newPassword !== confirm) {
      setFormError("New password and confirmation do not match.")
      return
    }

            changeUserPassword(
        {
            userId: user?._id,
            currentPassword: current,
            password: newPassword,
            passwordConfirm: confirm,
        },
        {
            onSuccess: () => {
            setCurrent("")
            setNewPassword("")
            setConfirm("")
            },
        }
        )
  }

  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <h2 className="font-semibold text-card-foreground">Change Password</h2>
        <ChevronRight
          size={16}
          className={`text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <Field label="Current password">
            <div className="relative">
              <input
                onChange={(e) => setCurrent(e.target.value)}
                value={current}
                type={showCurrent ? "text" : "password"}
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 mt-2 pr-10 text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </Field>

          <Field label="New password">
            <div className="relative">
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type={showNew ? "text" : "password"}
                required
                minLength={6}
                className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-sm"
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </Field>

          <Field label="Confirm new password">
            <input
              onChange={(e) => setConfirm(e.target.value)}
              value={confirm}
              type={showNew ? "text" : "password"}
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="Repeat new password"
            />
          </Field>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-secondary py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Updating password..." : "Update password"}
          </button>

          {(formError || error) && (
            <p className="text-red-700 text-sm">
              {formError || error.message}
            </p>
          )}
        </form>
      )}
    </div>
  )
}