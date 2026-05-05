export interface Coupon {
  code: string;
  description: string;
  discount: number; // percentage or fixed amount
  type: "percentage" | "fixed";
  minOrder?: number;
}

export const coupons: Coupon[] = [
  {
    code: "MRPIZZA10",
    description: "10% de desconto na primeira compra",
    discount: 10,
    type: "percentage",
  },
  {
    code: "BEMVINDO15",
    description: "15% de desconto para novos clientes",
    discount: 15,
    type: "percentage",
    minOrder: 15,
  },
  {
    code: "PIZZA20",
    description: "20% de desconto em pedidos acima de €20",
    discount: 20,
    type: "percentage",
    minOrder: 20,
  },
  {
    code: "FAMILIA30",
    description: "30% de desconto em pedidos acima de €30",
    discount: 30,
    type: "percentage",
    minOrder: 30,
  },
  {
    code: "GRATIS5",
    description: "€5 de desconto direto",
    discount: 5,
    type: "fixed",
  },
];
