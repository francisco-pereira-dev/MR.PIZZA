import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Pizza as PizzaType } from "../types";
import { AlertCircle, Flame, Heart } from "lucide-react";

interface PizzaCardProps {
  pizza: PizzaType;
  onAddToCart: (pizza: PizzaType) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (pizza: PizzaType) => void;
}

export function PizzaCard({ pizza, onAddToCart, isFavorite = false, onToggleFavorite }: PizzaCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-red-700 group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-white">
        <ImageWithFallback
          src={pizza.image}
          alt={pizza.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 p-0.5 sm:p-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {pizza.popular && (
          <Badge className="absolute right-2 top-2 bg-red-700 text-white border-2 border-yellow-400 font-bold flex items-center gap-1 text-xs px-2 py-0.5">
            <Flame className="h-3 w-3" />
            POPULAR
          </Badge>
        )}
        {onToggleFavorite && (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(pizza);
            }}
            className="absolute left-2 top-2 bg-white/90 hover:bg-white rounded-full h-8 w-8 sm:h-9 sm:w-9 shadow-lg"
            aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart className={`h-4 w-4 transition-all ${isFavorite ? 'fill-red-700 text-red-700' : 'text-gray-600'}`} />
          </Button>
        )}
      </div>
      <CardContent className="p-3 sm:p-4 bg-white flex-grow">
        <h3 className="mb-1.5 sm:mb-2 text-base sm:text-lg text-gray-900 group-hover:text-red-700 transition-colors font-bold">{pizza.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
          {pizza.description}
        </p>
        {pizza.allergens && pizza.allergens.length > 0 && (
          <div className="flex items-start gap-1 mb-2 sm:mb-3 bg-orange-50 p-1.5 sm:p-2 rounded">
            <AlertCircle className="h-3 w-3 text-orange-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-orange-700">
              <span className="font-semibold">Alergénios:</span> {pizza.allergens.join(", ")}
            </p>
          </div>
        )}
        <div className="flex items-baseline gap-2 mb-1 sm:mb-2">
          <span className="text-lg sm:text-xl font-black text-red-700">
            €{pizza.prices.small.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            Pequena
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Média: €{pizza.prices.medium.toFixed(2)} • Grande: €{pizza.prices.large.toFixed(2)}
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0 bg-white">
        <Button
          onClick={() => onAddToCart(pizza)}
          className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-4 sm:py-6 text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          ADICIONAR AO CARRINHO
        </Button>
      </CardFooter>
    </Card>
  );
}