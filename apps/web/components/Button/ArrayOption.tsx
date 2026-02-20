import React from "react";

export default function ArrayOption() {
  return (
    <div className="flex flex-row gap-2 text-gray-200 items-center">
      <button>
        <p className="text-neutral-dark">About Us</p>
      </button>
      |
      <button>
        <p className="text-neutral-dark">Contact</p>
      </button>
      |
      <button>
        <p className="text-neutral-dark">Help / FAQ</p>
      </button>
      |
      <button>
        <p className="text-neutral-dark">Feedback</p>
      </button>
    </div>
  );
}
