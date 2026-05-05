import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, MapPin, Phone } from "lucide-react";

interface HeroProps {
  onStoresClick?: () => void;
}

export function Hero({ onStoresClick }: HeroProps) {
  const scrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1705314674727-078cc60b6326?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGl6emElMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2Nzg4NzI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Pizza de fundo"
          className="h-full w-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10">
        <div className="max-w-3xl">
          <div className="mb-4 md:mb-6">
            <span className="inline-block bg-red-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide mb-3 md:mb-4">
              🍕 Sempre Tradizionale
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight">
            PIZZAS ITALIANAS
            <br />
            <span className="text-red-700">AUTÊNTICAS</span>
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl">
            Pizzas artesanais com ingredientes frescos e receitas tradicionais italianas. 
            Mais de 50 lojas em Portugal. Entrega ao domicílio ou takeaway.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4">
              <div className="bg-red-700 rounded-full p-2 md:p-3">
                <Clock className="h-4 w-4 md:h-6 md:w-6" />
              </div>
              <div>
                <div className="font-bold text-sm md:text-base">30-40 min</div>
                <div className="text-xs md:text-sm text-gray-400">Tempo de Entrega</div>
              </div>
            </div>

            <button
              onClick={onStoresClick}
              className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 hover:bg-white/20 transition-all cursor-pointer border-2 border-transparent hover:border-red-700 group"
            >
              <div className="bg-red-700 rounded-full p-2 md:p-3 group-hover:scale-110 transition-transform">
                <MapPin className="h-4 w-4 md:h-6 md:w-6" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm md:text-base group-hover:text-red-700 transition-colors">54 Lojas</div>
                <div className="text-xs md:text-sm text-gray-400">Ver Todas →</div>
              </div>
            </button>

            <div className="flex items-center gap-2 md:gap-4 bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-lg border-2 border-white/30">
              <div className="bg-red-700 p-2 md:p-3 rounded-full">
                <Phone className="h-4 w-4 md:h-6 md:w-6" />
              </div>
              <div>
                <div className="font-bold text-sm md:text-base">244 245 097</div>
                <div className="text-xs md:text-sm text-gray-400">Encomende Já</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
            <a
              href="#menu"
              onClick={scrollToMenu}
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-lg text-center"
            >
              Ver Menu Completo
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}