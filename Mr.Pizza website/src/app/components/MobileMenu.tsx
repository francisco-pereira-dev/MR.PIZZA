import { Button } from './ui/button';
import { Home, Menu, ShoppingBag, Heart, Clock, Phone, MapPin, Mail, Users, Briefcase, MessageSquare, User } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from './ui/sheet';
import { useState } from 'react';
import { assets } from '../data/assets';

interface MobileMenuProps {
  onNavigate: (section: string) => void;
  onStoresClick?: () => void;
}

export function MobileMenu({ onNavigate, onStoresClick }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: 'Menu', icon: Menu, section: 'menu' },
    { label: 'Lojas', icon: MapPin, section: 'lojas', isStores: true },
    { label: 'Universo Mr.Pizza', icon: MessageSquare, section: 'universo' },
    { label: 'Franchising', icon: Briefcase, section: 'franchising' },
    { label: 'Contactos', icon: Phone, section: 'contactos' },
  ];

  const quickAccessItems = [
    { label: 'Login / Registar', icon: User, section: 'login' },
    { label: 'Favoritos', icon: Heart, section: 'favorites' },
    { label: 'Meus Pedidos', icon: Clock, section: 'orders' },
  ];

  const handleNavigate = (section: string, isStores?: boolean) => {
    if (isStores && onStoresClick) {
      onStoresClick();
    } else {
      onNavigate(section);
    }
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10"
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left flex items-center">
            <img src={assets.logo} alt="Mr. Pizza" className="h-8 w-auto" />
          </SheetTitle>
          <SheetDescription className="text-left">
            Menu de navegação
          </SheetDescription>
        </SheetHeader>
        
        {/* Main Menu */}
        <nav className="mt-6 space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mb-2">Menu Principal</p>
          {menuItems.map((item) => (
            <Button
              key={item.section}
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base"
              onClick={() => handleNavigate(item.section, item.isStores)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Quick Access */}
        <nav className="mt-6 space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mb-2">Acesso Rápido</p>
          {quickAccessItems.map((item) => (
            <Button
              key={item.section}
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base"
              onClick={() => handleNavigate(item.section)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Contact Info */}
        <div className="mt-6 pt-6 border-t space-y-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3">Contacto</p>
          
          <div className="space-y-2 text-sm px-3">
            <a href="tel:+351244245097" className="flex items-center gap-2 hover:text-red-700 transition-colors">
              <Phone className="h-4 w-4" />
              244 245 097
            </a>
            <a href="mailto:geral@mrpizza.pt" className="flex items-center gap-2 hover:text-red-700 transition-colors">
              <Mail className="h-4 w-4" />
              geral@mrpizza.pt
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}