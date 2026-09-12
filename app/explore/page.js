import ExploreMenu from "@/components/ui/ExloreMenu";

export default function Explore() {
  return (
    <main className=" bg-background pt-21 px-2 ">
      <section className="mx-auto flex w-full  flex-col gap-3 ">
        <div>
          <h1 className="text-xl font-bold text-secondary sm:text-2xl md:text-3xl">
            Fresh From the Oven
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Artisanal baked goods made with love and fresh ingredients.
            Our bakers put care into every product we create.
          </p>
        </div>

        <div className="mt-8">
          <ExploreMenu />
        </div>
      </section>
    </main>
  );
}