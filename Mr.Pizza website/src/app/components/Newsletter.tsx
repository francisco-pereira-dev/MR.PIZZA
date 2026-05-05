import { useState } from 'react';
import { Mail, Flame } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Obrigado! Você está inscrito na nossa newsletter! 🔥');
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-3 md:mb-4">
            <Flame className="h-4 w-4 md:h-5 md:w-5" />
            <span className="font-bold uppercase text-xs md:text-sm">Newsletter Mr.Pizza</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 md:mb-3">
            RECEBA NOVIDADES E PROMOÇÕES
          </h2>
          <p className="text-sm md:text-base text-white/90 mb-4 md:mb-6 px-4">
            Inscreva-se e fique a par das últimas novidades, cupons de desconto e ofertas especiais!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 md:gap-3 max-w-md mx-auto px-4">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-11 md:h-12 bg-white text-black border-0 text-sm md:text-base"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 md:h-12 bg-black hover:bg-gray-900 text-white px-6 md:px-8 text-sm md:text-base whitespace-nowrap"
            >
              {isLoading ? 'Inscrevendo...' : 'Inscrever'}
            </Button>
          </form>
          <p className="text-xs text-white/70 mt-3 md:mt-4 px-4">
            Não compartilhamos seu email. Você pode cancelar a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
}