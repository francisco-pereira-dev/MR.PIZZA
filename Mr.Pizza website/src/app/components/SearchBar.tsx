import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Procurar pizzas, doces, bebidas..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 md:pl-12 pr-10 md:pr-12 h-12 md:h-14 text-sm md:text-lg border-2 border-gray-300 focus:border-red-700 rounded-full shadow-md"
        aria-label="Pesquisar produtos"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onChange('')}
          className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full hover:bg-gray-100"
          aria-label="Limpar pesquisa"
        >
          <X className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      )}
    </div>
  );
}