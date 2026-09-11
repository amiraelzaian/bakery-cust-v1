"use client";

import ThemeToggle from "@/components/ui/ThemeToggle";
import Logo from "../ui/Logo";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background fixed top-0 left-0 right-0 z-50 p-1">
      {/* Main Header */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        
        {/* Logo */}
        <Logo />

        {/* Desktop / Tablet Navigation */}
        <nav className="hidden items-center gap-6 text-secondary md:flex">
          <Link
            href="/orders"
            className="rounded-md p-1 hover:bg-muted"
          >
            Orders
          </Link>

          <Link
            href="/explore"
            className="rounded-md p-1 hover:bg-muted"
          >
            Explore
          </Link>

          <Link
            href="/seasonal"
            className="rounded-md p-1 hover:bg-muted"
          >
            Offers
          </Link>

          <Link
            href="/account"
            className="rounded-md p-1 hover:bg-muted"
          >
            Account
          </Link>
          <Link
            href="/login"
            className="rounded-md p-1  bg-secondary text-white hover:bg-secondary/90"
          >
            Get Started
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 text-secondary">
          
          {/* Cart */}
          <Link href="/cart">
            <ShoppingCart className="h-5 w-5" />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="hidden md:block"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* Theme */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out md:hidden shadow-md ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="min-h-0 overflow-hidden border-t border-border">
          <div className="flex flex-col gap-2 px-4 py-4 text-secondary">

            <Link
              href="/orders"
              className="rounded-md p-2 hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              Orders
            </Link>

            <Link
              href="/explore"
              className="rounded-md p-2 hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              Explore
            </Link>

            <Link
              href="/seasonal"
              className="rounded-md p-2 hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              Offers
            </Link>

            <Link
              href="/account"
              className="rounded-md p-2 hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              Account
            </Link>

            <Link
              href="/wishlist"
              className="rounded-md p-2 hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              Wishlist
            </Link>
            <Link
              href="/login"
              className="rounded-md p-2 hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>

          </div>
        </nav>
      </div>
    </header>
  );
}