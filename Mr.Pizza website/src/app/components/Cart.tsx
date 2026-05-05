import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { CartItem, SimpleCartItem } from "../types";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { Separator } from "./ui/separator";

interface CartProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  simpleItems: SimpleCartItem[];
  onRemoveItem: (index: number) => void;
  onRemoveSimpleItem: (index: number) => void;
  onUpdateItemQuantity?: (index: number, quantity: number) => void;
  onUpdateSimpleItemQuantity?: (index: number, quantity: number) => void;
  onCheckout: () => void;
}

export function Cart({ open, onClose, items, simpleItems, onRemoveItem, onRemoveSimpleItem, onUpdateItemQuantity, onUpdateSimpleItemQuantity, onCheckout }: CartProps) {
  const pizzaTotal = items.reduce((sum, item) => sum + item.price, 0);
  const simpleTotal = simpleItems.reduce((sum, item) => sum + item.price, 0);
  const total = pizzaTotal + simpleTotal;

  const getSizeLabel = (size: string) => {
    const labels = {
      small: "Pequena",
      medium: "Média",
      large: "Grande",
    };
    return labels[size as keyof typeof labels];
  };

  const getCrustLabel = (crust: string) => {
    const labels = {
      traditional: "Tradicional",
      thin: "Fina",
      stuffed: "Recheada",
    };
    return labels[crust as keyof typeof labels];
  };

  const allItemsCount = items.length + simpleItems.length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-lg flex flex-col max-h-[90vh] h-auto">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Carrinho de Compras</DialogTitle>
          <DialogDescription>
            Revise seus itens e finalize o pedido.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 px-1 min-h-0">
          {allItemsCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <ShoppingBag className="h-16 w-16 mb-4 opacity-20" />
              <p>O seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`pizza-${index}`}
                  className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm"
                >
                  <div className="flex-1">
                    <h3 className="mb-1 font-bold">{item.pizza.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                        {getSizeLabel(item.size)} • {getCrustLabel(item.crust)}
                      </div>
                      {item.extras.length > 0 && (
                        <div className="text-xs">
                          Extras: {item.extras.join(", ")}
                        </div>
                      )}
                    </div>
                    {onUpdateItemQuantity && (
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateItemQuantity(index, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateItemQuantity(index, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    <div className="mt-2 text-lg font-bold text-red-700">
                      €{item.price.toFixed(2)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveItem(index)}
                    className="hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {simpleItems.map((item, index) => (
                <div
                  key={`simple-${index}`}
                  className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm"
                >
                  <div className="flex-1">
                    <h3 className="mb-1 font-bold">{item.product.name}</h3>
                    {onUpdateSimpleItemQuantity && (
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateSimpleItemQuantity(index, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateSimpleItemQuantity(index, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    <div className="mt-2 text-lg font-bold text-red-700">
                      €{item.price.toFixed(2)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveSimpleItem(index)}
                    className="hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {allItemsCount > 0 && (
          <DialogFooter className="flex-col gap-4 flex-shrink-0 pt-4">
            <Separator />
            <div className="space-y-2 w-full">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-bold">€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Taxa de Entrega</span>
                <span>(calculada no checkout)</span>
              </div>
            </div>
            <Button
              onClick={onCheckout}
              className="w-full bg-red-700 hover:bg-red-800 font-bold"
              size="lg"
            >
              Finalizar Pedido - €{total.toFixed(2)}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}