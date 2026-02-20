import { Star } from "lucide-react";

interface RatingProps {
  value: number; // rating value (e.g. 4.3)
  max?: number; // max rating, default 5
  size?: number; // star size
  showDecimal?: boolean; // show decimal on number
}

export default function Rating({
  value,
  max = 5,
  size = 18,
  showDecimal = true,
}: RatingProps) {
  const safeValue = Math.min(Math.max(value, 0), max);
  const filledStars = Math.floor(safeValue);
  const hasHalfStar = safeValue % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      {/* Numeric rating */}
      <span className="text-sm font-bold text-zinc-800 border-b border-gray-400 text-center">
        {showDecimal ? safeValue.toFixed(1) : Math.round(safeValue)}
      </span>

      {/* Star rating */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, index) => {
          const isFilled = index < filledStars;
          const isHalf = index === filledStars && hasHalfStar;

          return (
            <div key={index} className="relative">
              <Star size={size} className="text-zinc-300" fill="currentColor" />

              {(isFilled || isHalf) && (
                <Star
                  size={size}
                  className="absolute top-0 left-0 text-yellow-500"
                  fill="currentColor"
                  style={{
                    clipPath: isHalf ? "inset(0 50% 0 0)" : "inset(0)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
