import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ image, title, description }) {
  return (
    <Link
      href="/categories"
      className="group overflow-hidden rounded-2xl bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="overflow-hidden">
        <Image
          width={400}
          height={300}
          src={image}
          alt={title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
          Explore
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}