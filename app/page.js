
import CategoriesScroller from "@/components/ui/CategoriesScroller";
import CategoryCard from "@/components/ui/CategoryCard";
import ContactItem from "@/components/ui/ContactItem";
import Feature from "@/components/ui/Feature";
import MainButton from "@/components/ui/MainButton";
import {
  ArrowRight,
  Clock3,
  Heart,
  MapPin,
  Mail,
  Phone,
 
  Milk,
} from "lucide-react";
import Image from "next/image";

import { Metadata } from "next";
import CallBtn from "@/components/ui/CallBtn";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "CREME & CRUMB | Freshly Baked With Love",
  description:
    "Explore CREME & CRUMB for freshly baked artisan breads, pastries, cakes, and delicious sweet treats made with love.",
  openGraph: {
    title: "CREME & CRUMB | Freshly Baked With Love",
    description:
      "Artisan breads, cakes, pastries, and sweet treats freshly baked for you.",
    images: [
      {
        url: "/images/breadcoffe2.jpg",
        width: 1200,
        height: 630,
        alt: "CREME & CRUMB bakery",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[650px] w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/breadcoffe2.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl flex-col justify-center px-4 pb-32 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
              Freshly baked with love
            </p>

            <h1 className="text-xl font-bold leading-[1.05] text-white sm:text-3xl lg:text-5xl">
              Fresh Baked
              <br />
              <span className="font-normal">Made for Your Moments</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
              Freshly baked goods delivered to your door, crafted with
              quality ingredients and prepared with love for every beautiful
              moment.
            </p>
          </div>
        </div>

        {/* Hero Buttons */}
        <div className="absolute bottom-0 left-0 z-10 flex w-full justify-center p-4 sm:p-6">
  <div className="grid w-full  grid-cols-1 gap-3 sm:grid-cols-3">
    <MainButton
      path="/cart"
      className="col-span-1 sm:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-white"
    >
      Order Now
      <ArrowRight className="h-5 w-5" />
    </MainButton>

    <MainButton
      path="/explore"
      className="flex  col-span-1  items-center justify-center rounded-xl bg-white py-3 text-primary hover:bg-white/90"
    >
      Explore Categories
    </MainButton>
  </div>
</div>
      </section>

      {/* ================= CATEGORIES ================= */}
    <section className="w-full overflow-hidden px-4 py-20 sm:px-6 lg:px-8 flex justify-center">
  <div className="mx-auto flex w-full min-w-0 max-w-7xl flex-col gap-3">
    <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          What we bake
        </p>

        <p className="mt-3 max-w-xl text-muted-foreground">
          From buttery pastries to beautifully decorated cakes, find
          something delicious for every occasion.
        </p>
      </div>
    </div>

    <CategoriesScroller />
  </div>
</section>

      {/* ================= ABOUT ================= */}
      <section className="bg-card px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <Image
  src="/images/bread1.jpg"
  alt="Freshly baked goods at GOLDEN CRUMBS"
  width={800}
  height={600}
  className="h-[450px] w-full rounded-3xl object-cover"
/>

            
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our story
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Baking happiness, one bite at a time.
            </h2>

            <p className="mt-6 leading-7 text-muted-foreground">
              At GOLDEN CRUMBS, we believe that the best memories often start
              around a table. That is why every loaf, pastry and cake is made
              with carefully selected ingredients and a whole lot of love.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Whether you are celebrating something special or simply treating
              yourself after a long day, we are here to make your moments a
              little sweeter.
            </p>

           
          </div>
        </div>
      </section>


      {/* ================= WHY US ================= */}
      <section className="bg-primary px-4 py-20 text-primary-foreground sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="mx-auto max-w-7xl flex flex-col gap-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">
              Why GOLDEN CRUMbS
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Baked differently
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Feature
              icon={<Milk className="h-6 w-6" />}
              title="Fresh ingredients"
              description="We choose quality ingredients so every bite tastes as good as it looks."
            />

            <Feature
              icon={<Heart className="h-6 w-6" />}
              title="Made with love"
              description="Every product is prepared with care, attention and a passion for baking."
            />

            <Feature
              icon={<Clock3 className="h-6 w-6" />}
              title="Fresh every day"
              description="Our bakery favorites are freshly prepared so you can enjoy them at their best."
            />
          </div>
        </div>
      </section>

      {/* ================= CONTACT / CTA ================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="mx-auto max-w-7xl ">
          <div className="overflow-hidden rounded-3xl bg-card">
            <div className="grid lg:grid-cols-2">
              {/* Contact Info */}
              <div className="p-8 sm:p-12 flex flex-col justify-center gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Get in touch
                </p>

                <h2 className="mt-3 text-xl font-bold sm:text-3xl">
                  Let us make your next moment sweeter.
                </h2>

                <p className="mt-5 leading-7 text-muted-foreground">
                  Have a question, special request or need a cake for an
                  upcoming celebration? We would love to hear from you.
                </p>

                <div className="mt-8 space-y-5">
                  <ContactItem
                    icon={<MapPin className="h-5 w-5" />}
                    title="Visit us"
                    text="123 Bakery Street, Your City"
                  />

                  <ContactItem
                    icon={<Phone className="h-5 w-5" />}
                    title="Call us"
                    text="+1 234 567 890"
                  />

                  <ContactItem
                    icon={<Mail className="h-5 w-5" />}
                    title="Email us"
                    text="hello@cremeandcrumb.com"
                  />
                </div>

                {/* <CallBtn/> */}
                <a
                href="tel:+201005707613"
                className="rounded-lg bg-primary px-3 py-2 font-bold text-white w-fit"
              >
                Call us
              </a>
              </div>

             
             </div>
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="border-t border-border px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center ">
        <div className="mx-auto max-w-2xl text-center flex flex-col justify-center items-center gap-4 ">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Stay in the loop
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Sweet news, straight to your inbox.
          </h2>

          <p className="mt-3 text-muted-foreground">
            Get updates about new treats, seasonal specials and bakery news.
          </p>

          <form className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row " >
            <input
              type="email"
              placeholder="Your email address"
              className="min-h-12 flex-1 rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
            />

            <button
              type="submit"
              className="cursor-pointer  min-h-12 rounded-xl bg-primary px-6 font-semibold text-white transition hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-primary">
              GOLDEN CRUMbS
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Freshly baked treats made with love for your everyday moments
              and special celebrations.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold">Shop</h3>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <a href="/shop" className="block transition hover:text-primary">
                All Products
              </a>

              <a
                href="/categories"
                className="block transition hover:text-primary"
              >
                Categories
              </a>

              <a
                href="/cakes"
                className="block transition hover:text-primary"
              >
                Cakes
              </a>

              <a
                href="/pastries"
                className="block transition hover:text-primary"
              >
                Pastries
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold">Company</h3>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <a href="/about" className="block transition hover:text-primary">
                About us
              </a>

              <a
                href="/contact"
                className="block transition hover:text-primary"
              >
                Contact
              </a>

              <a
                href="/delivery"
                className="block transition hover:text-primary"
              >
                Delivery
              </a>

              <a
                href="/faq"
                className="block transition hover:text-primary"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold">Visit us</h3>

            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>123 Bakery Street, Your City</span>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>+1 234 567 890</span>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>hello@cremeandcrumb.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <p>© 2026 GOLDEN CRUMBS. All rights reserved.</p>

            <div className="flex gap-5">
              <a href="/privacy" className="hover:text-primary">
                Privacy
              </a>

              <a href="/terms" className="hover:text-primary">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}









