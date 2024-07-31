
import Link from "next/link";
import Image from 'next/image'

import CartButton from "@/components/cartButton";
import Navigation from "./Navigation/Navigation";
import getCategoriesData from "@/lib/fetchData/getCategories";
import MobileMenu from "./Navigation/mobileMenu";

const Header = async () => {
  const categories = await getCategoriesData();
  return (
      <header className="py-4 md:py-5 lg:py-6 sticky left-0 top-0 z-20 mx-auto right-0 bg-white bg-opacity-70 backdrop-blur-md w-full max-w-7xl">
        <div className="flex items-center gap-5 mx-4">
          <div className="flex-shrink-0" >
            <Link href={'/'}>
            <Image 
            src="/shopnest-logo.png" width={200} alt="logo" height={200} />
            </Link>
          </div>
          <Navigation categoriesData={categories} />
          <div className="space-x-4 sm:space-x-0 ml-auto flex items-center">
          <CartButton />  
          <div className="block sm:hidden">
          <MobileMenu/> 
          </div>
          </div>
        </div>
      </header>
  );
};

export default Header;