import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExtraProduct } from "../types";

interface ExtraProductCardProps {
  product: ExtraProduct;
  onAdd: (product: ExtraProduct) => void;
}

const categoryLabels = {
  starter: "Entrada",
  dessert: "Sobremesa",
  sauce: "Molho",
};

const categoryColors = {
  starter: "bg-green-600",
  dessert: "bg-yellow-600",
  sauce: "bg-orange-600",
};

const hoverColors = {
  starter: "hover:border-green-600",
  dessert: "hover:border-yellow-600",
  sauce: "hover:border-orange-600",
};

export function ExtraProductCard({ product, onAdd }: ExtraProductCardProps) {
  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-200 ${hoverColors[product.category]} group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <div className="relative h-32 w-full overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className={`absolute right-2 top-2 ${categoryColors[product.category]} text-white text-xs font-bold`}>
          {categoryLabels[product.category]}
        </Badge>
      </div>
      <CardContent className="p-3 flex-grow">
        <h4 className="text-sm font-bold mb-1">{product.name}</h4>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="text-lg font-black text-green-600">
          €{product.price.toFixed(2)}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button
          onClick={() => onAdd(product)}
          size="sm"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold transition-all duration-300"
        >
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
}