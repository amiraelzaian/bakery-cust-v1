'use client'

import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"
import ProfileHeader from "./ProfileHeader"
import ProfileInfo from "./ProfileInfo"
import AccountLinks from "./AccountLinks"
import ChangePasswordSection from "./ChangePasswordSection"
import LogoutButton from "./LogoutButton"
import SpendingChart from "./SpendingChart"

export default function ProfilePage() {
  const { data } = useAuth()
  const user = data?.data

  if (!user) {
    return (
      <section className="flex justify-center p-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </section>
    )
  }

  return (
    <section className="mx-auto   w-full px-5 pt-20 pb-16  ">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start col-span-1 flex flex-col gap-4">
          <ProfileHeader user={user} />
          <div className="hidden lg:block ">
            <div className=" flex flex-col gap-4">

            <AccountLinks />
            <LogoutButton />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 col-span-2 flex flex-col gap-4">
          <ProfileInfo user={user} />
           <SpendingChart />
          <ChangePasswordSection />

          {/* Links + logout stay inline on mobile/tablet */}
          <div className="lg:hidden">
            <div className="flex flex-col gap-4">

            <AccountLinks />
            <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}