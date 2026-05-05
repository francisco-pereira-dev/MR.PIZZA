import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Beverage } from "../types";

interface BeverageCardProps {
  beverage: Beverage;
  onAdd: (beverage: Beverage) => void;
}

export function BeverageCard({ beverage, onAdd }: BeverageCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-600 group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative w-full overflow-hidden bg-white flex items-center justify-center" style={{ height: '180px' }}>
        <ImageWithFallback
          src={beverage.image}
          alt={beverage.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 p-4"
        />
        {beverage.size && (
          <Badge variant="outline" className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2 bg-white text-xs font-bold border-blue-600 text-blue-700 px-1.5 py-0.5">
            {beverage.size}
          </Badge>
        )}
      </div>
      <CardContent className="p-2.5 sm:p-3 flex-grow">
        <h4 className="text-xs sm:text-sm font-bold mb-1 group-hover:text-blue-600 transition-colors">{beverage.name}</h4>
        <p className="text-xs text-gray-600 mb-1.5 sm:mb-2 line-clamp-1">
          {beverage.description}
        </p>
        <div className="text-base sm:text-lg font-black text-blue-600">
          €{beverage.price.toFixed(2)}
        </div>
      </CardContent>
      <CardFooter className="p-2.5 sm:p-3 pt-0">
        <Button
          onClick={() => onAdd(beverage)}
          size="sm"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300 text-xs sm:text-sm py-3 sm:py-4"
        >
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
}