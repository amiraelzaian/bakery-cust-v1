import Image from "next/image"

export default function ProfileHeader({ user }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted">
        {user.avatarUrl ? (
          <Image src={user.avatarUrl} alt={user.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-muted-foreground">
            {user.name?.[0]?.toUpperCase()}
          </div>
        )}
      </div>
      <div>
        <h1 className="text-lg font-bold text-foreground">{user.name}</h1>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
    </div>
  )
}