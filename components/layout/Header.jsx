"use client";

import ThemeToggle from "@/components/ui/ThemeToggle";
import Logo from "../ui/Logo";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useGetCart } from "@/hooks/useCart";
import { useGetWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";

const NAV_LINKS_LOGGED = [
  { href: "/orders", label: "Orders" },
  { href: "/explore", label: "Explore" },
  { href: "/ai-assistant", label: "AI-Assistant" },
  { href: "/account", label: "Account" },
];

const NAV_LINKS_NOT_LOGGED = [
  { href: "/explore", label: "Explore" },
  { href: "/ai-assistant", label: "AI-Assistant" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { data, isLoading: authLoading } = useAuth();
  const user = data?.data;
  const isLoggedIn = Boolean(user);

  const NAV_LINKS = isLoggedIn ? NAV_LINKS_LOGGED : NAV_LINKS_NOT_LOGGED;

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Only fetch cart/wishlist once we know the user is logged in
  const { cart } = useGetCart({ enabled: isLoggedIn });
  const { wishlist } = useGetWishlist({ enabled: isLoggedIn });

  const cartCount = cart?.cartItems?.length ?? 0;
  const wishlistCount = wishlist?.length ?? 0;

  return (
    <header className="border-b border-border bg-background fixed top-0 left-0 right-0 z-50 p-1">
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

          {!authLoading && !isLoggedIn && (
            <Link
              href="/login"
              className="rounded-md p-1 bg-secondary text-white hover:bg-secondary/90"
            >
              Get Started
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 text-secondary">
          {isLoggedIn && (
            <>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link href="/wishlist" className="relative hidden md:block">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* Theme */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out md:hidden shadow-md ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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

            {isLoggedIn && (
              <>
                <Link
                  href="/cart"
                  className={`flex items-center gap-2 rounded-md p-2 hover:bg-muted ${
                    isActive("/cart") ? "bg-muted font-semibold text-primary" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Cart
                  {cartCount > 0 && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/wishlist"
                  className={`flex items-center gap-2 rounded-md p-2 hover:bg-muted ${
                    isActive("/wishlist") ? "bg-muted font-semibold text-primary" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            {!authLoading && !isLoggedIn && (
              <Link
                href="/login"
                className="rounded-md p-2 hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}