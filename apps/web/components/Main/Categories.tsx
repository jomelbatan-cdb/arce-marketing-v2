"use client";
import React, { useEffect, useState } from "react";
import CategoryCards from "../Cards/CategoryCards";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategories } from "@/hooks/category/useCategory";

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const categories = useCategories();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const updateScrollState = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const triggerActivity = () => {
    setIsActive(true);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsActive(false);
    }, 2000); // ⏱️ hide after 2 seconds of inactivity
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 280;

    triggerActivity();

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollState();

    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      updateScrollState();
      triggerActivity();
    };

    el.addEventListener("scroll", onScroll);
    triggerActivity(); // initial hint

    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  if (!categories) return null;
  return (
    <div className="flex flex-col  relative overflow-hidden">
      <h1 className="text-lg md:text-2xl px-4 py-3 text-primary-dark border-x border-gray-300">
        Categories
      </h1>

      <div className="relative">
        {/* LEFT CHEVRON */}
        <AnimatePresence>
          {isActive && canScrollLeft && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 shadow-primary-light"
            >
              <ChevronLeft size={22} color="#000bcc" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* SCROLL CONTAINER */}
        <div
          ref={scrollRef}
          className="
    grid grid-rows-2 auto-cols-max grid-flow-col gap-4 
    overflow-x-auto py-3 px-2 
    scrollbar-hide scroll-smooth
    md:flex md:flex-row md:overflow-x-auto md:px-6
  "
        >
          {categories?.map((category) => (
            <CategoryCards key={category._id} category={category} />
          ))}
        </div>

        {/* RIGHT CHEVRON */}
        <AnimatePresence>
          {isActive && canScrollRight && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 shadow-primary-light"
            >
              <ChevronRight size={22} color="#000bcc" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
