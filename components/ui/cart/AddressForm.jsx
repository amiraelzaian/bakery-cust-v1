'use client'

export default function AddressForm({ address, onChange }) {
  function handleChange(field, value) {
    onChange({ ...address, [field]: value })
  }

  return (
    <div className=" space-y-3 rounded-md border border-border bg-muted/40 p-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Governorate</label>
          <input
            value={address.governorate}
            onChange={(e) => handleChange("governorate", e.target.value)}
            placeholder="Cairo"
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">City</label>
          <input
            value={address.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Nasr City"
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Street</label>
        <input
          value={address.street}
          onChange={(e) => handleChange("street", e.target.value)}
          placeholder="Abbas El Akkad Street"
          className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Zip Code</label>
        <input
          value={address.zipCode}
          onChange={(e) => handleChange("zipCode", e.target.value)}
          placeholder="11765"
          className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>
    </div>
  )
}