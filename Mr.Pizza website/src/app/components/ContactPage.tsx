import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

export function ContactPage() {
  const [formData, setFormData] = useState({
    department: '',
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
      setFormData({
        department: '',
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black mb-4">
              <span className="text-red-700">CONTACTE-NOS</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tem alguma questão? Estamos aqui para ajudar!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Envie-nos uma Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="department" className="text-sm font-semibold mb-2 block">
                    Departamento <span className="text-red-700">*</span>
                  </Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geral">Geral</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="franchising">Franchising</SelectItem>
                      <SelectItem value="comunicacao">Propostas e Parcerias</SelectItem>
                      <SelectItem value="recrutamento">Recrutamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="subject" className="text-sm font-semibold mb-2 block">
                    Assunto <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-700 hover:bg-red-800 text-white h-12 text-lg font-bold"
                >
                  {isSubmitting ? 'A Enviar...' : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Informações de Contacto</h2>
              
              <div className="space-y-6">
                {/* Escritório */}
                <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-700" />
                    Escritório
                  </h3>
                  <p className="text-gray-700">
                    Centro Comercial Plaza, Loja AI<br />
                    2410-128 Leiria
                  </p>
                  <a href="tel:244245097" className="text-red-700 font-semibold mt-2 inline-block hover:underline">
                    Telefone: 244 245 097
                  </a>
                </div>

                {/* Emails */}
                <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-red-700" />
                    Emails por Departamento
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">Geral:</p>
                      <a href="mailto:geral@mrpizza.pt" className="text-red-700 hover:underline">
                        geral@mrpizza.pt
                      </a>
                      <p className="text-xs text-gray-500">Assuntos gerais</p>
                    </div>
                    
                    <div className="pt-2">
                      <p className="font-semibold text-gray-900">Marketing:</p>
                      <a href="mailto:marketing@mrpizza.pt" className="text-red-700 hover:underline">
                        marketing@mrpizza.pt
                      </a>
                    </div>
                    
                    <div className="pt-2">
                      <p className="font-semibold text-gray-900">Franchising:</p>
                      <a href="mailto:franchising@mrpizza.pt" className="text-red-700 hover:underline">
                        franchising@mrpizza.pt
                      </a>
                    </div>
                    
                    <div className="pt-2">
                      <p className="font-semibold text-gray-900">Propostas e Parcerias:</p>
                      <a href="mailto:comunicacao@mrpizza.pt" className="text-red-700 hover:underline">
                        comunicacao@mrpizza.pt
                      </a>
                      <p className="text-xs text-gray-500">Tel: 244 245 097</p>
                    </div>
                  </div>
                </div>

                {/* Recrutamento */}
                <div className="bg-red-700 text-white p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Recrutamento</h3>
                  <p className="text-sm mb-3">
                    Interessado em trabalhar connosco?
                  </p>
                  <a
                    href="mailto:geral@mrpizza.pt"
                    className="inline-block bg-white text-red-700 px-4 py-2 rounded font-bold hover:bg-gray-100 transition-colors"
                  >
                    Ver Vagas Disponíveis
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
