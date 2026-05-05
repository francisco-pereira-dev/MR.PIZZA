import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface StickyCartButtonProps {
  itemCount: number;
  total: number;
  onClick: () => void;
}

export function StickyCartButton({ itemCount, total, onClick }: StickyCartButtonProps) {
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden">
      <Button
        onClick={onClick}
        size="lg"
        className="h-12 sm:h-14 px-5 sm:px-6 bg-red-700 hover:bg-red-800 text-white shadow-2xl rounded-full flex items-center gap-2 sm:gap-3 animate-in slide-in-from-bottom-10"
      >
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-yellow-500 text-black font-bold text-xs border-2 border-red-700">
            {itemCount}
          </Badge>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs opacity-90">Ver Carrinho</span>
          <span className="font-bold text-sm sm:text-base">€{total.toFixed(2)}</span>
        </div>
      </Button>
    </div>
  );
}