import { ShoppingCart, Menu, Heart, User, Clock, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MobileMenu } from "./MobileMenu";
import { assets } from "../data/assets";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  favoritesCount?: number;
  onFavoritesClick?: () => void;
  onNavigate?: (section: string) => void;
  onStoresClick?: () => void;
  onLoginClick?: () => void;
}

export function Header({ cartItemsCount, onCartClick, favoritesCount = 0, onFavoritesClick, onNavigate, onStoresClick, onLoginClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-black shadow-lg">
      <div className="container mx-auto px-3 md:px-4 py-2.5 md:py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu + Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            {onNavigate && <MobileMenu onNavigate={onNavigate} onStoresClick={onStoresClick} />}
            <div 
              className="cursor-pointer" 
              onClick={() => {
                onNavigate?.("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img 
                src={assets.logo} 
                alt="Mr. Pizza" 
                className="h-10 sm:h-12 md:h-14 w-auto"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          {onNavigate && (
            <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              <button
                onClick={() => onNavigate("menu")}
                className="text-white hover:text-red-700 transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Menu
              </button>
              <button
                onClick={() => onStoresClick?.()}
                className="text-white hover:text-red-700 transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Lojas
              </button>
              <button
                onClick={() => onNavigate("universo")}
                className="text-white hover:text-red-700 transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Universo Mr.Pizza
              </button>
              <button
                onClick={() => onNavigate("franchising")}
                className="text-white hover:text-red-700 transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Franchising
              </button>
              <button
                onClick={() => onNavigate("contactos")}
                className="text-white hover:text-red-700 transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Contactos
              </button>
            </nav>
          )}

          {/* Right Side - Phone, Login, Favorites & Cart */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="tel:+351244245097"
              className="hidden lg:flex items-center gap-2 text-white hover:text-red-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">244 245 097</span>
            </a>
            
            {onFavoritesClick && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onFavoritesClick}
                className="relative text-white hover:bg-white/10 hidden md:flex h-10 w-10 lg:ml-3"
                aria-label="Favoritos"
              >
                <Heart className={`h-5 w-5 ${favoritesCount > 0 ? 'fill-red-700 text-red-700' : ''}`} />
                {favoritesCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-700 text-white font-bold text-xs">
                    {favoritesCount}
                  </Badge>
                )}
              </Button>
            )}
            
            {onLoginClick && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onLoginClick}
                className="text-white hover:bg-white/10 hidden md:flex h-10 w-10"
                aria-label="Login"
              >
                <User className="h-5 w-5" />
              </Button>
            )}
            
            <Button
              size="lg"
              onClick={onCartClick}
              className="relative bg-red-700 hover:bg-red-800 text-white px-3 py-2 md:px-4 md:py-2.5 h-9 md:h-11 text-sm md:text-base"
            >
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
              <span className="ml-1.5 md:ml-2 hidden sm:inline">Carrinho</span>
              {cartItemsCount > 0 && (
                <Badge className="absolute -right-1.5 md:-right-2 -top-1.5 md:-top-2 h-5 w-5 md:h-6 md:w-6 rounded-full p-0 flex items-center justify-center bg-yellow-500 text-black font-bold border-2 border-black text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}