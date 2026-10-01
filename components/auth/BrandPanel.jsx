"use client";

import Logo from "../ui/Logo";

// Fixed colors: the panel always sits on a dark overlay, so these must NOT follow the theme
const TEXT = "text-[#F8F1E7]";   // warm white
const ACCENT = "text-[#E3A857]";  // gold

export default function BrandPanel() {
  return (
    <aside className="relative hidden min-h-screen overflow-hidden lg:flex">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bread2.jpg')" }}
      />

      {/* Dark warm overlay */}
      <div className="absolute inset-0 bg-brand-panel/50" />

      {/* Gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-panel-deep via-brand-panel/80 to-brand-panel/85" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col justify-between p-10 xl:p-14">
        {/* Brand */}
        <div>
          <Logo />
        </div>

        {/* Main content */}
        <div className="flex max-w-xl flex-col gap-4">
          <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${ACCENT}`}>
            Member privileges
          </p>

          <h1 className={`font-serif text-5xl leading-[1.1] drop-shadow-sm xl:text-6xl ${TEXT}`}>
            Slow fermentation,
            <br />
            <span className={`italic ${ACCENT}`}>morning ritual.</span>
          </h1>

          <p className={`max-w-md text-sm leading-7 ${TEXT} opacity-90`}>
            Join the Golden Crumbs baker&apos;s circle to reserve morning
            bake batches, save your preferences, and follow your artisanal
            deliveries from our oven to your door.
          </p>

          {/* Benefits */}
          <div className="grid max-w-lg grid-cols-2 gap-8">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10">
                <span className={ACCENT}>☀</span>
              </div>
              <div>
                <p className={`text-sm font-medium ${TEXT}`}>Daily 4:30 AM bake</p>
                <p className={`mt-1 text-xs leading-5 ${TEXT} opacity-70`}>
                  Reserve fresh from the oven
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10">
                <span className={ACCENT}>🥨</span>
              </div>
              <div>
                <p className={`text-sm font-medium ${TEXT}`}>VIP tasting previews</p>
                <p className={`mt-1 text-xs leading-5 ${TEXT} opacity-70`}>
                  Seasonal menu access
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-lg border-t border-white/20 pt-6">
          <p className={`font-serif text-lg italic leading-7 ${TEXT} opacity-95`}>
            &ldquo;The sourdough morning delivery changed our breakfast
            routine completely.&rdquo;
          </p>
          <p className={`mt-3 text-xs ${TEXT} opacity-60`}>
            — Camille Laurent, Bakery Club Member
          </p>
        </div>
      </div>
    </aside>
  );
}