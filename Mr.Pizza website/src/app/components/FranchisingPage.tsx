import { useState } from 'react';
import { Store, TrendingUp, Users, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';

export function FranchisingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success('Pedido enviado com sucesso! A nossa equipa de franchising entrará em contacto em breve.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Store className="h-5 w-5" />
              <span className="font-bold uppercase text-sm">Seja Nosso Parceiro</span>
            </div>
            <h1 className="text-5xl font-black mb-6">
              ABRA O SEU PRÓPRIO<br />MR.PIZZA
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Junte-se a uma das marcas de pizzas italianas de maior sucesso em Portugal. 
              Mais de 54 lojas, tradição italiana e suporte completo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:franchising@mrpizza.pt"
                className="bg-white text-red-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5" />
                franchising@mrpizza.pt
              </a>
              <a
                href="tel:244245097"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                244 245 097
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-12">
              PORQUÊ <span className="text-red-700">MR.PIZZA</span>?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Marca Consolidada</h3>
                <p className="text-gray-600">
                  Mais de 54 lojas em Portugal continental e ilhas. Reconhecimento nacional e clientela fiel.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Modelo de Sucesso</h3>
                <p className="text-gray-600">
                  Conceito testado e comprovado. Receitas italianas autênticas e processos otimizados.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Suporte Completo</h3>
                <p className="text-gray-600">
                  Formação inicial, assistência contínua, marketing e operações. Acompanhamos o seu sucesso.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6">O Que Oferecemos:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Formação Completa</p>
                    <p className="text-sm text-gray-600">Preparação de pizzas, gestão e atendimento</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Identidade Visual</p>
                    <p className="text-sm text-gray-600">Branding completo e materiais de marketing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Fornecedores Aprovados</p>
                    <p className="text-sm text-gray-600">Rede de fornecedores com qualidade garantida</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Suporte Operacional</p>
                    <p className="text-sm text-gray-600">Acompanhamento contínuo da operação</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Marketing Nacional</p>
                    <p className="text-sm text-gray-600">Campanhas e presença nas redes sociais</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Receitas Exclusivas</p>
                    <p className="text-sm text-gray-600">Tradição italiana autêntica</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black mb-4">
                INTERESSADO EM <span className="text-red-700">FRANCHISING</span>?
              </h2>
              <p className="text-gray-600 text-lg">
                Preencha o formulário abaixo e a nossa equipa entrará em contacto consigo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-semibold mb-2 block">
                  Nome Completo <span className="text-red-700">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-semibold mb-2 block">
                    Email <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold mb-2 block">
                    Telefone <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="city" className="text-sm font-semibold mb-2 block">
                  Cidade/Localização Pretendida <span className="text-red-700">*</span>
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Ex: Lisboa, Porto, Braga..."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-semibold mb-2 block">
                  Mensagem <span className="text-red-700">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  placeholder="Conte-nos mais sobre o seu projeto, experiência e motivação..."
                  required
                />
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Contacto direto:</strong> Para informações mais detalhadas, contacte{' '}
                  <a href="mailto:franchising@mrpizza.pt" className="text-red-700 font-semibold hover:underline">
                    franchising@mrpizza.pt
                  </a>
                  {' '}ou ligue{' '}
                  <a href="tel:244245097" className="text-red-700 font-semibold hover:underline">
                    244 245 097
                  </a>
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-700 hover:bg-red-800 text-white h-14 text-lg font-bold"
              >
                {isSubmitting ? 'A Enviar Pedido...' : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Pedido de Informação
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
