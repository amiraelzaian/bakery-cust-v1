"use client";

import { loversQuarrel } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";


export default function Logo() { 

  return (
    <section className="flex justify-center items-center gap-2">
     <Link href={"/"}> <Image
        src="/images/logo.png"
        alt="CREME & CRUMB logo"
        width={45}
        height={45}
        className="object-fill"
      /></Link>

      <h1 className={`text-primary font-bold text-2xl md:text-4xl ${loversQuarrel.className}`}>Golden Crumbs</h1>
    </section>
  );
}