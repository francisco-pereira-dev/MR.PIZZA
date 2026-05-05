import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Pizza, PizzaSize, CrustType, CartItem } from "../types";
import { extras } from "../data/pizzaExtras";
import { Minus, Plus } from "lucide-react";

interface PizzaCustomizerProps {
  pizza: Pizza | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export function PizzaCustomizer({
  pizza,
  open,
  onClose,
  onAddToCart,
}: PizzaCustomizerProps) {
  const [size, setSize] = useState<PizzaSize>("medium");
  const [crust, setCrust] = useState<CrustType>("traditional");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (!pizza) return null;

  const sizeLabels = {
    small: "Pequena (25cm)",
    medium: "Média (30cm)",
    large: "Grande (35cm)",
  };

  const crustLabels = {
    traditional: "Tradicional",
    thin: "Fina",
    stuffed: "Recheada (+€2.00)",
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const calculatePrice = () => {
    let total = pizza.prices[size];
    
    if (crust === "stuffed") {
      total += 2.00;
    }
    
    selectedExtras.forEach((extraId) => {
      const extra = extras.find((e) => e.id === extraId);
      if (extra) {
        total += extra.price;
      }
    });
    
    return total * quantity;
  };

  const handleAddToCart = () => {
    const item: CartItem = {
      pizza,
      size,
      crust,
      extras: selectedExtras,
      quantity,
      price: calculatePrice(),
    };
    onAddToCart(item);
    onClose();
    // Reset form
    setSize("medium");
    setCrust("traditional");
    setSelectedExtras([]);
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl md:text-2xl">Personalizar {pizza.name}</DialogTitle>
          <DialogDescription>
            Escolha o tamanho e adicione ingredientes extras à sua pizza
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-3 sm:py-4">
          {/* Size Selection */}
          <div>
            <Label className="mb-2 sm:mb-3 block text-sm sm:text-base font-bold">Tamanho</Label>
            <RadioGroup value={size} onValueChange={(v) => setSize(v as PizzaSize)}>
              {(Object.keys(pizza.prices) as PizzaSize[]).map((sizeKey) => (
                <div key={sizeKey} className="flex items-center space-x-2 py-1">
                  <RadioGroupItem value={sizeKey} id={`size-${sizeKey}`} />
                  <Label
                    htmlFor={`size-${sizeKey}`}
                    className="flex-1 cursor-pointer text-sm sm:text-base"
                  >
                    <div className="flex justify-between">
                      <span>{sizeLabels[sizeKey]}</span>
                      <span className="font-bold">€{pizza.prices[sizeKey].toFixed(2)}</span>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Crust Selection */}
          <div>
            <Label className="mb-2 sm:mb-3 block text-sm sm:text-base font-bold">Tipo de Massa</Label>
            <RadioGroup value={crust} onValueChange={(v) => setCrust(v as CrustType)}>
              {(Object.keys(crustLabels) as CrustType[]).map((crustKey) => (
                <div key={crustKey} className="flex items-center space-x-2 py-1">
                  <RadioGroupItem value={crustKey} id={`crust-${crustKey}`} />
                  <Label
                    htmlFor={`crust-${crustKey}`}
                    className="cursor-pointer text-sm sm:text-base"
                  >
                    {crustLabels[crustKey]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Extras Selection */}
          <div>
            <Label className="mb-2 sm:mb-3 block text-sm sm:text-base font-bold">Ingredientes Extras</Label>
            <div className="space-y-1.5 sm:space-y-2">
              {extras.map((extra) => (
                <div key={extra.id} className="flex items-center space-x-2 py-1">
                  <Checkbox
                    id={extra.id}
                    checked={selectedExtras.includes(extra.id)}
                    onCheckedChange={() => handleExtraToggle(extra.id)}
                  />
                  <Label
                    htmlFor={extra.id}
                    className="flex-1 cursor-pointer text-sm sm:text-base"
                  >
                    <div className="flex justify-between">
                      <span>{extra.name}</span>
                      <span className="font-semibold">+€{extra.price.toFixed(2)}</span>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <Label className="mb-2 sm:mb-3 block text-sm sm:text-base font-bold">Quantidade</Label>
            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-9 w-9 sm:h-10 sm:w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 sm:w-12 text-center font-bold text-base sm:text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-9 w-9 sm:h-10 sm:w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3">
          <div className="flex w-full items-center justify-between sm:justify-start sm:gap-6">
            <div>
              <div className="text-xs sm:text-sm text-gray-600">Total</div>
              <div className="font-black text-lg sm:text-xl text-red-600">
                €{calculatePrice().toFixed(2)}
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              className="bg-red-600 hover:bg-red-700 text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 font-bold"
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}