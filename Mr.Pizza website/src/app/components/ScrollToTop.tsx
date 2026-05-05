import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { useScrollToTop } from '../hooks/useScrollToTop';

export function ScrollToTop() {
  const { isVisible, scrollToTop } = useScrollToTop(400);

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-red-700 hover:bg-red-800 shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}