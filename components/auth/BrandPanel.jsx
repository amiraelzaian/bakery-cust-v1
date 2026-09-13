"use client";

export default function BrandPanel() {
  return (
    <aside className="relative hidden min-h-screen overflow-hidden lg:flex ">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/bread2.jpg')",
        }}
      />

      {/* Dark warm overlay */}
      <div className="absolute inset-0 bg-[#241611]/75" />

      {/* Subtle gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1d1410] via-[#241611]/40 to-[#241611]/50" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col justify-between p-10 xl:p-14">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary/50 bg-secondary/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-secondary"
              >
                <path
                  d="M12 21V4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 8C9 8 7 6 7 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 12C9 12 7 10 7 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 8C15 8 17 6 17 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 12C15 12 17 10 17 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <p className="font-serif text-xl tracking-[0.18em] text-background">
                GOLDEN CRUMBS
              </p>
              <p className="mt-0.5 text-[9px] tracking-[0.3em] text-background/60">
                ARTISAN BAKERY & MORE
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-secondary">
            Member privileges
          </p>

          <h1 className="font-serif text-5xl leading-[1.05] text-background xl:text-6xl">
            Slow fermentation,
            <br />
            <span className="italic text-secondary">
              morning ritual.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-background/75">
            Join the Golden Crumbs baker&apos;s circle to reserve morning
            bake batches, save your preferences, and follow your artisanal
            deliveries from our oven to your door.
          </p>

          {/* Benefits */}
          <div className="mt-10 grid max-w-lg grid-cols-2 gap-8">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary/50 bg-secondary/10">
                <span className="text-secondary">☀</span>
              </div>

              <div>
                <p className="text-sm font-medium text-background">
                  Daily 4:30 AM bake
                </p>
                <p className="mt-1 text-xs leading-5 text-background/55">
                  Reserve fresh from the oven
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary/50 bg-secondary/10">
                <span className="text-secondary">🥨</span>
              </div>

              <div>
                <p className="text-sm font-medium text-background">
                  VIP tasting previews
                </p>
                <p className="mt-1 text-xs leading-5 text-background/55">
                  Seasonal menu access
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-lg border-t border-background/15 pt-6">
          <p className="font-serif text-lg italic leading-7 text-background/85">
            &ldquo;The sourdough morning delivery changed our breakfast
            routine completely.&rdquo;
          </p>

          <p className="mt-3 text-xs text-background/50">
            — Camille Laurent, Bakery Club Member
          </p>
        </div>
      </div>
    </aside>
  );
}