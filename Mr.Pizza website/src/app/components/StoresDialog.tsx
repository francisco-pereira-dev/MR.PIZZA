import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Input } from './ui/input';
import { MapPin, Phone, Mail, Search, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { assets } from '../data/assets';
import { stores } from '../data/stores';

interface StoresDialogProps {
  open: boolean;
  onClose: () => void;
}

export function StoresDialog({ open, onClose }: StoresDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Helper function to get district from city
  const getDistrict = (city: string): string => {
    const districtMap: { [key: string]: string } = {
      // Aveiro
      'Águeda': 'Aveiro', 'Aveiro': 'Aveiro', 'Estarreja': 'Aveiro', 'Ílhavo': 'Aveiro',
      'Ovar': 'Aveiro', 'Santa Maria da Feira': 'Aveiro', 'São João da Madeira': 'Aveiro',
      // Braga
      'Braga': 'Braga', 'Guimarães': 'Braga', 'Póvoa de Lanhoso': 'Braga',
      // Coimbra
      'Coimbra': 'Coimbra', 'Condeixa-a-Nova': 'Coimbra', 'Figueira da Foz': 'Coimbra',
      'Lousã': 'Coimbra', 'Pombal': 'Coimbra',
      // Leiria
      'Alcobaça': 'Leiria', 'Caldas da Rainha': 'Leiria', 'Leiria': 'Leiria',
      'Marinha Grande': 'Leiria', 'Nazaré': 'Leiria', 'Peniche': 'Leiria',
      'Porto de Mós': 'Leiria', 'Bombarral': 'Leiria',
      // Lisboa
      'Amadora': 'Lisboa', 'Cascais': 'Lisboa', 'Lisboa': 'Lisboa', 
      'Loures': 'Lisboa', 'Odivelas': 'Lisboa', 'Oeiras': 'Lisboa', 
      'Sintra': 'Lisboa', 'Alcochete': 'Lisboa', 'Corroios': 'Lisboa',
      // Porto
      'Gondomar': 'Porto', 'Maia': 'Porto', 'Matosinhos': 'Porto', 'Porto': 'Porto',
      'Póvoa de Varzim': 'Porto', 'Santo Tirso': 'Porto', 'Valongo': 'Porto',
      'Vila do Conde': 'Porto', 'Vila Nova de Gaia': 'Porto',
      // Santarém
      'Abrantes': 'Santarém', 'Entroncamento': 'Santarém', 'Rio Maior': 'Santarém',
      'Santarém': 'Santarém', 'Torres Novas': 'Santarém', 'Tomar': 'Santarém',
      // Setúbal
      'Almada': 'Setúbal', 'Barreiro': 'Setúbal', 'Montijo': 'Setúbal', 'Palmela': 'Setúbal',
      'Seixal': 'Setúbal', 'Setúbal': 'Setúbal',
      // Viseu
      'Viseu': 'Viseu',
      // Madeira
      'Funchal': 'Madeira', 'Caniço': 'Madeira',
    };
    return districtMap[city] || 'Outros';
  };

  // Group stores by district
  const storesByDistrict = useMemo(() => {
    const filtered = stores.filter(store => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      const district = getDistrict(store.city);
      return (
        store.name?.toLowerCase().includes(query) ||
        store.address?.toLowerCase().includes(query) ||
        district?.toLowerCase().includes(query) ||
        store.city?.toLowerCase().includes(query)
      );
    });

    const grouped: { [key: string]: typeof stores } = {};
    filtered.forEach(store => {
      const district = getDistrict(store.city);
      if (!grouped[district]) {
        grouped[district] = [];
      }
      grouped[district].push(store);
    });

    // Sort districts alphabetically
    return Object.keys(grouped)
      .sort()
      .reduce((acc, key) => {
        acc[key] = grouped[key];
        return acc;
      }, {} as { [key: string]: typeof stores });
  }, [searchQuery]);

  const totalStores = useMemo(() => {
    return Object.values(storesByDistrict).reduce((sum, stores) => sum + stores.length, 0);
  }, [storesByDistrict]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col p-0">
        {/* Fixed Header Section */}
        <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-black text-center mb-2 flex items-center justify-center gap-2">
              <span className="text-red-700">54 LOJAS</span>
              <img src={assets.logo} alt="Mr. Pizza" className="h-8 md:h-10 w-auto" />
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 text-sm md:text-base">
              Presentes em todo Portugal Continental e Madeira
            </DialogDescription>
          </DialogHeader>

          {/* Search Bar */}
          <div className="relative mt-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Procurar por cidade, distrito ou nome da loja..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:border-red-700 focus:outline-none text-sm md:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {totalStores === stores.length ? (
                <span><strong>{totalStores} lojas</strong> encontradas</span>
              ) : (
                <span><strong>{totalStores}</strong> de <strong>{stores.length} lojas</strong> encontradas</span>
              )}
            </p>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Stores by District */}
          {Object.keys(storesByDistrict).length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma loja encontrada com "{searchQuery}"</p>
              <Button
                onClick={() => setSearchQuery('')}
                variant="outline"
                className="mt-4"
              >
                Limpar Pesquisa
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(storesByDistrict).map(([district, districtStores]) => (
                <div key={district} className="bg-gray-50 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-black text-red-700 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {district.toUpperCase()} ({districtStores.length})
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {districtStores.map((store) => (
                      <div
                        key={store.id}
                        className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                      >
                        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                          {store.name}
                        </h4>
                        <div className="space-y-2 text-xs md:text-sm text-gray-600">
                          <p className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-700" />
                            <span>{store.address}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4 flex-shrink-0 text-red-700" />
                            <a
                              href={`tel:${store.phone}`}
                              className="hover:text-red-700 transition-colors"
                            >
                              {store.phone}
                            </a>
                          </p>
                          <p className="flex items-center gap-2">
                            <Mail className="h-4 w-4 flex-shrink-0 text-red-700" />
                            <a
                              href={`mailto:${store.email}`}
                              className="hover:text-red-700 transition-colors"
                            >
                              {store.email}
                            </a>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-6 border-t text-center text-sm text-gray-600">
            <p>
              🍕 Entrega ao domicílio disponível em todas as lojas |{' '}
              <a href="tel:+351244245097" className="text-red-700 font-semibold hover:underline">
                244 245 097
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}