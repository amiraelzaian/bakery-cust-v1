'use client'

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  const router = useRouter()

  function handleLogout() {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer  flex w-full items-center justify-center gap-2 rounded-xl   py-3 text-sm font-medium  transition text-red-50 bg-red-800 hover:bg-red-500"
    >
      <LogOut size={16} /> Log out
    </button>
  )
}