import { Pizza, Heart, Users, Sparkles, MapPin, Trophy } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface AboutPageProps {
  onNavigate?: (section: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1ha2luZyUyMGl0YWxpYW58ZW58MXx8fHwxNzY3ODgwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Pizza italiana"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-red-700 px-4 py-2 rounded-full mb-6">
              <Pizza className="h-5 w-5" />
              <span className="font-bold uppercase text-sm">Sempre Tradizionale</span>
            </div>
            <h1 className="text-5xl font-black mb-6">
              UNIVERSO <span className="text-red-700">MR.PIZZA</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A verdadeira tradição da pizza italiana em Portugal
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black mb-4">
                A NOSSA <span className="text-red-700">HISTÓRIA</span>
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                O <strong>Mr.Pizza</strong> nasceu com uma missão clara: trazer a autêntica tradição 
                da pizza italiana para Portugal. Com mais de <strong>54 lojas</strong> espalhadas pelo 
                país, consolidámo-nos como uma das principais referências em pizzas artesanais.
              </p>
              
              <p className="text-lg leading-relaxed">
                A nossa filosofia é simples mas poderosa: <strong className="text-red-700">Sempre Tradizionale</strong>. 
                Cada pizza é preparada com ingredientes frescos e de qualidade superior, seguindo receitas 
                italianas autênticas que preservam o sabor e a tradição que nos tornam únicos.
              </p>

              <p className="text-lg leading-relaxed">
                Estabelecemos parcerias exclusivas com as melhores marcas, como a parceria pioneira com o 
                <strong> Grupo Ferrero®</strong> para criar sobremesas irresistíveis com <strong>Nutella®</strong>, 
                unindo cremosidade e tradição italiana a cada mordida.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-12">
              OS NOSSOS <span className="text-red-700">VALORES</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Pizza className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Tradição Italiana</h3>
                <p className="text-gray-600">
                  Receitas autênticas que respeitam a verdadeira tradição da pizza italiana, 
                  com ingredientes de qualidade superior.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Paixão pelo Detalhe</h3>
                <p className="text-gray-600">
                  Cada pizza é preparada com dedicação e cuidado, garantindo que cada cliente 
                  tenha uma experiência memorável.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Família Mr.Pizza</h3>
                <p className="text-gray-600">
                  Mais do que clientes, criamos uma família. Cada membro da nossa equipa trabalha 
                  para proporcionar o melhor serviço.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Numbers Section */}
      <div className="py-16 bg-gradient-to-r from-red-700 to-red-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-12">
              MR.PIZZA EM NÚMEROS
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-black mb-2">54+</div>
                <div className="text-white/80 uppercase text-sm font-semibold">Lojas em Portugal</div>
              </div>
              <div>
                <div className="text-5xl font-black mb-2">29</div>
                <div className="text-white/80 uppercase text-sm font-semibold">Pizzas Diferentes</div>
              </div>
              <div>
                <div className="text-5xl font-black mb-2">100%</div>
                <div className="text-white/80 uppercase text-sm font-semibold">Ingredientes Frescos</div>
              </div>
              <div>
                <div className="text-5xl font-black mb-2">1</div>
                <div className="text-white/80 uppercase text-sm font-semibold">Tradição Italiana</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Partnership */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-8 w-8 text-red-700" />
                <h2 className="text-2xl font-black">
                  PARCERIA EXCLUSIVA
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  O <strong>Mr.Pizza®</strong> uniu-se ao <strong>Grupo Ferrero®</strong> para criar 
                  três novidades irresistíveis com o produto <strong>Nutella®</strong>.
                </p>
                
                <p className="text-lg">
                  <strong className="text-red-700">Cremosidade e tradição a cada mordida!</strong>
                </p>
                
                <div className="bg-white p-4 rounded border border-yellow-300 mt-4">
                  <p className="font-semibold mb-2">Os nossos novos artigos:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• <strong>Fagottino</strong> com Nutella® e avelã</li>
                    <li>• <strong>Cannoncini</strong> – massa, Nutella®, açúcar branco</li>
                    <li>• <strong>Cocco Bello</strong> – natas, leite condensado, Nutella®, coco desidratado</li>
                  </ul>
                </div>
                
                <p className="text-sm italic text-gray-600 mt-4">
                  Uma parceria pioneira e exclusiva que junta a verdadeira tradição da pizza italiana 
                  e o sabor autêntico e único da Nutella®. A verdadeira combinação "Originale" italiana em Portugal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <MapPin className="h-12 w-12 text-red-700 mx-auto mb-4" />
            <h2 className="text-3xl font-black mb-6">
              EM TODO O <span className="text-red-700">PAÍS</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Com <strong>54 lojas</strong> de Norte a Sul de Portugal, incluindo as ilhas da Madeira, 
              estamos sempre perto de si. Entrega ao domicílio ou takeaway, como preferir!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-3 text-red-700">Portugal Continental</h3>
                <p className="text-sm text-gray-600">
                  Lisboa, Porto, Coimbra, Braga, Leiria, Faro, Évora, e muitas outras cidades.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-3 text-red-700">Regiões Autónomas</h3>
                <p className="text-sm text-gray-600">
                  Funchal (Madeira) com duas lojas para melhor o servir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Trophy className="h-16 w-16 text-red-700 mx-auto mb-6" />
            <h2 className="text-3xl font-black mb-4">
              JUNTE-SE À FAMÍLIA MR.PIZZA
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Experimente a verdadeira pizza italiana. Sempre Tradizionale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onNavigate?.('menu')}
                className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Ver Menu
              </Button>
              <Button
                onClick={() => onNavigate?.('lojas')}
                className="bg-white/10 backdrop-blur-sm border-2 border-white hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Encontrar Loja
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}