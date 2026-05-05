import { Tag, X, Flame } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function PromotionBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-1.5 md:py-2 px-3 md:px-4 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]"></div>
      </div>
      
      <div className="container mx-auto flex items-center justify-center gap-1.5 md:gap-2 relative z-10">
        <Flame className="h-3 w-3 md:h-4 md:w-4 animate-pulse flex-shrink-0" />
        <p className="text-xs md:text-sm font-bold text-center">
          <span className="hidden md:inline">🔥 PROMOÇÕES ATIVAS: </span>
          Use <span className="bg-black/30 px-1.5 py-0.5 rounded mx-0.5 md:mx-1 font-mono text-xs">WELCOME10</span> para 10% OFF
          <span className="hidden sm:inline"> | <span className="bg-black/30 px-1.5 py-0.5 rounded mx-0.5 md:mx-1 font-mono text-xs">PIZZA20</span> para 20% OFF acima de €20</span>
        </p>
        <Flame className="h-3 w-3 md:h-4 md:w-4 animate-pulse flex-shrink-0" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 md:right-2 h-5 w-5 md:h-6 md:w-6 text-white hover:bg-white/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}