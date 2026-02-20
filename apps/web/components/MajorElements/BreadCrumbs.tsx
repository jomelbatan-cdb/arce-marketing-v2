import React from "react";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
  const paths = ["Home", "Electronics", "Laptops", "Gaming Laptops"]; // dummy path

  return (
    <nav className="flex text-gray-600 text-sm mb-4" aria-label="Breadcrumb">
      {paths.map((path, index) => (
        <div key={index} className="flex items-center">
          <a
            href="#"
            className={`hover:text-primary transition-colors ${
              index === paths.length - 1 ? "text-gray-400 cursor-default" : ""
            }`}
          >
            {path}
          </a>
          {index < paths.length - 1 && (
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
}
