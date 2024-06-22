
import Link from "next/link";
import Image from 'next/image'

import ButtonAction from "@/components/buttonAction";
import Navigation from "./Navigation";
import getCategoriesData from "@/lib/fetchData/getCategories";

const Header = async () => {
  const categories = await getCategoriesData();
  return (
      <header className="py-4 md:py-5 lg:py-6 sticky left-0 top-0 z-20 mx-auto right-0 bg-white shadow-sm  w-full max-w-7xl border-b ">
        <div className="flex items-center gap-5 mx-4 ">
          <div className="flex-shrink-0" >
            <Link href={'/'}>
            <Image 
            src="/shopnest-logo.png" width={200} alt="logo" height={200} />
            </Link>
          </div>
          <Navigation categoriesData={categories} />
          <ButtonAction />
        </div>
      </header>
  );
};

export default Header;