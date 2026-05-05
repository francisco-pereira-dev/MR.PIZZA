import { useState } from 'react';
import { Users, MapPin, Clock, Send, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

export function RecruitmentPage() {
  const [formData, setFormData] = useState({
    store: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    position: '',
    availability: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success('Candidatura enviada com sucesso! Entraremos em contacto em breve.');
      setFormData({
        store: '',
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        email: '',
        phone: '',
        position: '',
        availability: '',
        description: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-full mb-4">
              <Briefcase className="h-5 w-5" />
              <span className="font-bold uppercase text-sm">Junte-se à Nossa Família</span>
            </div>
            <h1 className="text-4xl font-black mb-4">
              <span className="text-red-700">RECRUTAMENTO</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Vagas para Alcobaça, Nazaré, Coimbra e Funchal - Madeira
            </p>
          </div>

          {/* Job Information */}
          <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-6">Estamos a Recrutar!</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Funções Disponíveis:</h3>
                  <p className="text-white/90">Pizzaiolo(a) e Operador(a) de Balcão</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Lojas:</h3>
                  <p className="text-white/90">Alcobaça, Nazaré, Coimbra, Funchal - Madeira</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Regime:</h3>
                  <p className="text-white/90">Full-time ou Part-time</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Idade:</h3>
                  <p className="text-white/90">18 aos 30 anos</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6">
              <h3 className="font-bold mb-2">O que procuramos:</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Gosto pela restauração moderna</li>
                <li>• Saber trabalhar em equipa</li>
                <li>• Facilidade em atendimento ao público</li>
                <li>• Disponibilidade para trabalhar por turnos, fins-de-semana e feriados</li>
              </ul>
            </div>

            <div className="mt-6 bg-white/10 p-4 rounded">
              <p className="text-sm">
                <strong>Precisamos de aumentar a nossa família</strong> e para isso terás de passar pelo nosso capo locale!
              </p>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Formulário de Candidatura</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="store" className="text-sm font-semibold mb-2 block">
                  Candidata-se à loja de: <span className="text-red-700">*</span>
                </Label>
                <Select
                  value={formData.store}
                  onValueChange={(value) => setFormData({ ...formData, store: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a loja" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alcobaca">Alcobaça</SelectItem>
                    <SelectItem value="nazare">Nazaré</SelectItem>
                    <SelectItem value="coimbra">Coimbra</SelectItem>
                    <SelectItem value="funchal">Funchal - Madeira</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-semibold mb-2 block">
                    Nome <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-semibold mb-2 block">
                    Apelido <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age" className="text-sm font-semibold mb-2 block">
                    Idade
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="30"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="gender" className="text-sm font-semibold mb-2 block">
                    Sexo <span className="text-red-700">*</span>
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

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
                  Número de Telefone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="position" className="text-sm font-semibold mb-2 block">
                  Escolha a função a que se candidata <span className="text-red-700">*</span>
                </Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => setFormData({ ...formData, position: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pizzaiolo">Pizzaiolo(a)</SelectItem>
                    <SelectItem value="operador">Operador(a) de Balcão</SelectItem>
                    <SelectItem value="ambos">Ambas as funções</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="availability" className="text-sm font-semibold mb-2 block">
                  Disponibilidade Horária <span className="text-red-700">*</span>
                </Label>
                <Input
                  id="availability"
                  type="text"
                  placeholder="Ex: Full-time, Part-time, fins-de-semana..."
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Indique a sua disponibilidade de horário
                </p>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-semibold mb-2 block">
                  Candidatura - Breve Descrição <span className="text-red-700">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  placeholder="Conte-nos sobre si, a sua experiência e porque quer juntar-se ao Mr.Pizza..."
                  required
                />
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Nota:</strong> Também pode enviar o seu CV diretamente para{' '}
                  <a href="mailto:geral@mrpizza.pt" className="text-red-700 font-semibold hover:underline">
                    geral@mrpizza.pt
                  </a>
                  {' '}ou passar pela loja de Alcobaça, Nazaré, Coimbra ou Funchal - Madeira.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-700 hover:bg-red-800 text-white h-14 text-lg font-bold"
              >
                {isSubmitting ? 'A Enviar Candidatura...' : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Candidatura
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
