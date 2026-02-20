import React from "react";

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  isLoading: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  text,
  onClick,
  type = "button",
  isLoading,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`bg-primary-light text-white font-bold py-2 px-4 rounded hover:bg-primary disabled:bg-gray-600 disabled:text-black transition ${className}`}
    >
      {isLoading ? "Submitting" : text}
    </button>
  );
};

export default CTAButton;
