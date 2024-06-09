import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navigation from "./Navigation";
import getCategoriesData from "@/lib/fetchData/getCategories";

export const revalidate = 0;
const Header = async () => {
  const categories = await getCategoriesData();
  console.log(categories)
  return (
    <header className="mx-auto py-2 md:py-3 lg:py-5 max-w-7xl border-b">
      <div className="flex items-center justify-between">
        <div className="w-auto h-auto">
          <Link href={"/"}>
            <Image
              alt="logo"
              loading="lazy"
              width="200"
              height="150"
              decoding="async"
              data-nimg="1"
              src="/_next/image?url=%2Fshopnest-high-resolution-logo-transparent.png&w=640&q=75"
            />
          </Link>
        </div>
        <Navigation categoriesData={categories} />
      </div>
    </header>
  );
};

export default Header;
