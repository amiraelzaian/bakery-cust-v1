import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="text-xl font-semibold text-foreground">
          Artisan Bakery
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}