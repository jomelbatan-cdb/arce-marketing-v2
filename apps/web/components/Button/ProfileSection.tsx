"use client";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { arceAssets } from "../../constant";
import Image from "next/image";
import Link from "next/link";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useRouter } from "next/navigation";

export default function ProfileSection() {
  const { user, token, role } = useAuthStore();
  const { logoutUser } = useAuthentication();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleLogout = () => {
    logoutUser();
    setMenuOpen(false);
  }; // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {user && token ? (
        <>
          <div
            className="flex flex-row gap-2 items-center cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <Image
              src={arceAssets.A}
              alt="user avatar"
              className="size-6 rounded-full bg-gray-300 p-1"
            />
            <p className="text-neutral-dark">{user.username}</p>
          </div>

          {/* Modal Menu */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
            >
              {role === "admin" && (
                <button
                  className="w-full text-green-500 text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    router.replace("/admin");
                    setMenuOpen(false);
                  }}
                >
                  Admin Mode
                </button>
              )}
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                onClick={() => {
                  alert("Change Password clicked");
                  setMenuOpen(false);
                }}
              >
                Change Password
              </button>
              <button
                className="w-full text-black text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  alert("Set Profile clicked");
                  setMenuOpen(false);
                }}
              >
                Set Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-row gap-2 text-gray-600">
          <Link href={"/login"}>
            <p className="text-accent">Sign In</p>
          </Link>
          |{" "}
          <Link href={"/register"}>
            <p className="text-accent">Sign Up</p>
          </Link>
        </div>
      )}
    </div>
  );
}
