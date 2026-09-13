export default function BrandPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between h-full bg-[#2A1D14] text-[#F4EDE4] p-12">
      <div>
        <p className="text-xs tracking-wide text-[#D9A15B]">Member privileges</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight">
          Slow fermentation,<br />
          <span className="italic text-[#D9A15B]">morning ritual.</span>
        </h1>
        <p className="mt-4 text-sm text-[#C9BBAA] max-w-xs">
          Join our baker&apos;s circle to reserve morning bake batches,
          save dietary preferences, and track artisanal deliveries in real time.
        </p>

        <div className="flex gap-8 mt-10">
          <div>
            <p className="text-sm font-medium">Daily 4:30 AM bake</p>
            <p className="text-xs text-[#9C8B78]">Reserve fresh out of oven</p>
          </div>
          <div>
            <p className="text-sm font-medium">VIP tasting previews</p>
            <p className="text-xs text-[#9C8B78]">Seasonal menu access</p>
          </div>
        </div>
      </div>

      <blockquote className="text-sm italic text-[#C9BBAA] border-t border-[#4A3B2C] pt-6">
        &ldquo;The sourdough morning delivery changed our breakfast routine completely.&rdquo;
        <footer className="mt-2 not-italic text-xs text-[#9C8B78]">
          — Camille Laurent, Bakery Club Member
        </footer>
      </blockquote>
    </div>
  );
}