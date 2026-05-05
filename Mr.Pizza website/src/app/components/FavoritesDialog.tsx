import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { Pizza } from '../types';

interface FavoritesDialogProps {
  open: boolean;
  onClose: () => void;
  favorites: Pizza[];
  onRemoveFavorite: (pizzaId: string) => void;
  onAddToCart: (pizza: Pizza) => void;
}

export function FavoritesDialog({ open, onClose, favorites, onRemoveFavorite, onAddToCart }: FavoritesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-700 fill-red-700" />
            Minhas Pizzas Favoritas
          </DialogTitle>
          <DialogDescription>
            {favorites.length > 0 
              ? `Você tem ${favorites.length} ${favorites.length === 1 ? 'pizza favorita' : 'pizzas favoritas'}`
              : 'Você ainda não tem pizzas favoritas'}
          </DialogDescription>
        </DialogHeader>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Heart className="h-16 w-16 mb-4 opacity-20" />
            <p>Marque suas pizzas favoritas para vê-las aqui!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {favorites.map((pizza) => (
              <div key={pizza.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{pizza.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{pizza.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveFavorite(pizza.id)}
                    className="text-red-700 hover:bg-red-50"
                  >
                    <Heart className="h-5 w-5 fill-red-700" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-red-700">
                    a partir de €{pizza.prices.small.toFixed(2)}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => {
                      onAddToCart(pizza);
                      onClose();
                    }}
                    className="bg-red-700 hover:bg-red-800"
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}