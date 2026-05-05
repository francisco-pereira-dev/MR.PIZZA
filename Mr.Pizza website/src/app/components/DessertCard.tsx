import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dessert } from "../data/desserts";
import { Sparkles } from "lucide-react";

interface DessertCardProps {
  dessert: Dessert;
  onAdd: (dessert: Dessert) => void;
}

export function DessertCard({ dessert, onAdd }: DessertCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-yellow-600 group flex flex-col h-full w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        <ImageWithFallback
          src={dessert.image}
          alt={dessert.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 drop-shadow-lg" />
        </div>
      </div>
      <CardContent className="p-2.5 sm:p-4 flex-grow">
        <h4 className="mb-1 text-sm sm:text-base font-bold group-hover:text-yellow-700 transition-colors">{dessert.name}</h4>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
          {dessert.description}
        </p>
        <div className="text-base sm:text-lg font-black text-yellow-700">
          €{dessert.price.toFixed(2)}
        </div>
      </CardContent>
      <CardFooter className="p-2.5 sm:p-4 pt-0">
        <Button
          onClick={() => onAdd(dessert)}
          size="sm"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm py-3 sm:py-4"
        >
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
}