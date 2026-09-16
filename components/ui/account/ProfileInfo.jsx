'use client'

import { useState, useEffect } from "react"
import { Pencil } from "lucide-react"
import { useUpdateProfile } from "@/hooks/useAuth"
import { Field, Row } from "./FormField"

export default function ProfileInfo({ user }) {
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: { governorate: "", city: "", street: "", zipCode: "" },
  })

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
        phone: user.phone ?? "",
        address: {
          governorate: user.address?.governorate ?? "",
          city: user.address?.city ?? "",
          street: user.address?.street ?? "",
          zipCode: user.address?.zipCode ?? "",
        },
      })
    }
  }, [user])

  const { updateProfile, isPending } = useUpdateProfile()

  function handleChange(e) {
    const { name, value } = e.target
    if (["governorate", "city", "street", "zipCode"].includes(name)) {
      setForm((f) => ({ ...f, address: { ...f.address, [name]: value } }))
    } else {
      setForm((f) => ({ ...f, [name]: value }))
    }
  }

  function handleSave(e) {
    e.preventDefault()
    updateProfile(form, { onSuccess: () => setIsEditing(false) })
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-card-foreground">Profile Info</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <Pencil size={12} /> Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Full name">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </Field>

          <Field label="Phone">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Governorate">
              <input
                name="governorate"
                value={form.address.governorate}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="City">
              <input
                name="city"
                value={form.address.city}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
          </div>

          <Field label="Street">
            <input
              name="street"
              value={form.address.street}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </Field>

          <Field label="Zip code">
            <input
              name="zipCode"
              value={form.address.zipCode}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </Field>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isPending}
              className="flex-1 rounded-md border border-border py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-md bg-foreground py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      ) : (
        <dl className="flex flex-col items-start gap-4 justify-center">
          <Row label="Full name" value={user.name} />
          <Row label="Email" value={user.email} />
          <Row label="Phone" value={user.phone || "Not added"} />
          <Row
            label="Address"
            value={
              user.address?.street
                ? `${user.address.street}, ${user.address.city}, ${user.address.governorate} ${user.address.zipCode ?? ""}`.trim()
                : "Not added"
            }
          />
        </dl>
      )}
    </div>
  )
}