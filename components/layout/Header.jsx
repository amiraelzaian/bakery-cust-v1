"use client";

import ThemeToggle from "@/components/ui/ThemeToggle";
import Logo from "../ui/Logo";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/orders", label: "Orders" },
  { href: "/explore", label: "Explore" },
  { href: "/seasonal", label: "Offers" },
  { href: "/account", label: "Account" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

   const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <header className="border-b border-border bg-background fixed top-0 left-0 right-0 z-50 p-1 ">
      {/* Main Header */}
      <div className="mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Logo />

        {/* Desktop / Tablet Navigation */}
        <nav className="hidden items-center gap-6 text-secondary md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-md p-1 hover:bg-muted ${
                isActive(href) ? "bg-muted font-semibold text-primary" : ""
              }`}
            >
              {label}
            </Link>
          ))}

         { !token && (
            <Link
              href="/login"
              className="rounded-md p-1  bg-secondary text-white hover:bg-secondary/90"
            >
              Get Started
            </Link>
          )}
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

            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-md p-2 hover:bg-muted ${
                  isActive(href) ? "bg-muted font-semibold text-primary" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/wishlist"
              className={`rounded-md p-2 hover:bg-muted ${
                isActive("/wishlist") ? "bg-muted font-semibold text-primary" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              Wishlist
            </Link>
               { !token && (
                    <Link
                  href="/login"
                  className="rounded-md p-2 hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  Get Started
            </Link>)}

          </div>
        </nav>
      </div>
    </header>
  );
}