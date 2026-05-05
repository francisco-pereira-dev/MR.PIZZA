export interface Review {
  id: string;
  pizzaId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    pizzaId: "1",
    userName: "Maria Silva",
    rating: 5,
    comment: "A melhor Margherita que já comi! Massa perfeita e ingredientes frescos.",
    date: "2026-01-02",
  },
  {
    id: "r2",
    pizzaId: "1",
    userName: "João Costa",
    rating: 4,
    comment: "Muito boa, mas poderia ter mais manjericão.",
    date: "2026-01-01",
  },
  {
    id: "r3",
    pizzaId: "2",
    userName: "Ana Rodrigues",
    rating: 5,
    comment: "Pepperoni delicioso e bem generoso. Recomendo!",
    date: "2025-12-30",
  },
  {
    id: "r4",
    pizzaId: "2",
    userName: "Pedro Santos",
    rating: 5,
    comment: "Entrega rápida e pizza quentinha. Perfeita!",
    date: "2025-12-28",
  },
  {
    id: "r5",
    pizzaId: "3",
    userName: "Carla Mendes",
    rating: 4,
    comment: "Ótima opção vegetariana, muito saborosa.",
    date: "2025-12-29",
  },
  {
    id: "r6",
    pizzaId: "5",
    userName: "Rui Ferreira",
    rating: 5,
    comment: "Os 4 queijos são incríveis! Combinação perfeita.",
    date: "2026-01-03",
  },
  {
    id: "r7",
    pizzaId: "5",
    userName: "Sofia Almeida",
    rating: 5,
    comment: "Para os amantes de queijo, é simplesmente divinal!",
    date: "2026-01-01",
  },
  {
    id: "r8",
    pizzaId: "4",
    userName: "Miguel Torres",
    rating: 3,
    comment: "Boa, mas não sou grande fã de ananás na pizza.",
    date: "2025-12-27",
  },
];
