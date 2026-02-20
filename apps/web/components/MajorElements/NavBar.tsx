import { arceAssets } from "../../constant";
import Image from "next/image";
import React from "react";
import SearchBar from "../fields/SearchBar";
import CartButton from "../Button/CartButton";
import ProfileSection from "../Button/ProfileSection";
import ArrayOption from "../Button/ArrayOption";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed w-full px-8 py-4 flex flex-col border-b border-gray-50 shadow-sm z-50 bg-white">
      <div className="flex flex-row justify-end items-center  gap-8">
        <div className="hidden md:block">
          <ArrayOption />
        </div>
        <ProfileSection />
      </div>
      <div className="flex flex-row items-center gap-8 relative">
        <Image
          src={arceAssets.ARCEMAR}
          alt="ARCE Logo"
          className="h-8 md:h-16 w-fit"
        />
        <a
          href="/"
          className="absolute inset-0 z-10 h-8 md:h-16 w-[18%] md:w-[10%]"
        ></a>
        <SearchBar
          placeholders={[
            "Browse new arrivals...",
            "Buy bond paper",
            "Order photo paper",
            "Shop computer peripherals",
            "Compare printers",
            "Find digital cameras",
            "Browse musical instruments",
            "Buy office supplies",
            "Search for sports equipment",
            "Order printer inks",
            "Find storage devices",
          ]}
          interval={10000}
        />
        <CartButton count={105} />
      </div>
    </nav>
  );
}
