import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  MapPin,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { arceAssets } from "@/constant";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & description */}
        <div className="space-y-4">
          <Image
            src={arceAssets.ARCEMAR}
            alt="ARCE Logo"
            className="h-8 md:h-16 w-fit"
          />
          <p className="text-gray-400">
            Your IT essentials, all in one place reliable, fast, and convenient.
          </p>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-primary" />
                <a
                  href="https://www.facebook.com/arcemktg"
                  className="hover:text-white"
                >
                  ARCE Marketing
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+63 912 345 6789</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Saint Benito Ave, Manila, Philippines</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a
                  href="mailto:support@shopease.com"
                  className="hover:text-white"
                >
                  support@shopease.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Offers
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Track Order
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ARCE Marketing. All rights reserved.
      </div>
    </footer>
  );
}
