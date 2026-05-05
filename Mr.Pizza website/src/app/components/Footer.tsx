import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { assets } from '../data/assets';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-black text-white pt-8 md:pt-12 pb-4 md:pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="mb-3 md:mb-4 flex justify-center sm:justify-start">
              <img src={assets.logo} alt="Mr. Pizza" className="h-8 md:h-10 w-auto" />
            </div>
            <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">
              Sempre Tradizionale. Pizzas autênticas italianas com ingredientes frescos e qualidade superior.
            </p>
            <div className="flex gap-3 justify-center sm:justify-start">
              <a href="https://www.facebook.com/mr.pizza.portugal" target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/mrpizza.pt" target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/user/canalmrpizza" target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/mr-pizza/" target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4">Contacto</h4>
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <a href="tel:+351244245097" className="flex items-center gap-2 hover:text-red-700 transition-colors justify-center sm:justify-start">
                <Phone className="h-4 w-4" />
                244 245 097
              </a>
              <a href="mailto:geral@mrpizza.pt" className="flex items-center gap-2 hover:text-red-700 transition-colors justify-center sm:justify-start">
                <Mail className="h-4 w-4" />
                geral@mrpizza.pt
              </a>
              <div className="flex items-start gap-2 text-gray-400 justify-center sm:justify-start">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Centro Comercial Plaza, Loja AI<br />2410-128 Leiria</span>
              </div>
            </div>
          </div>

          {/* Horário */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4">Horário</h4>
            <div className="space-y-2 text-xs md:text-sm text-gray-400">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Clock className="h-4 w-4" />
                <span>Segunda a Domingo</span>
              </div>
              <div className="sm:pl-6">
                <p>12h00 - 23h00</p>
                <p className="text-xs mt-1">(Horários podem variar por loja)</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4">Mr.Pizza</h4>
            <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              <button 
                onClick={() => onNavigate?.('menu')} 
                className="block hover:text-red-700 transition-colors w-full text-center sm:text-left"
              >
                Menu
              </button>
              <button 
                onClick={() => onNavigate?.('contactos')} 
                className="block hover:text-red-700 transition-colors w-full text-center sm:text-left"
              >
                Contactos
              </button>
              <button 
                onClick={() => onNavigate?.('franchising')} 
                className="block hover:text-red-700 transition-colors w-full text-center sm:text-left"
              >
                Franchising
              </button>
              <button 
                onClick={() => onNavigate?.('recrutamento')} 
                className="block hover:text-red-700 transition-colors w-full text-center sm:text-left"
              >
                Recrutamento
              </button>
              <button 
                onClick={() => onNavigate?.('universo')} 
                className="block hover:text-red-700 transition-colors w-full text-center sm:text-left"
              >
                Universo Mr.Pizza
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 md:pt-6 text-center text-xs md:text-sm text-gray-400">
          <p>&copy; 2026 MR.PIZZA PORTUGAL | Todos os direitos reservados | Sempre Tradizionale</p>
        </div>
      </div>
    </footer>
  );
}