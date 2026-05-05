import { dessertImages } from './dessertImages';

export interface Dessert {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export const desserts: Dessert[] = [
  {
    id: "d1",
    name: "Fagottino",
    description: "Nutella® e avelã",
    image: dessertImages.fagottino,
    price: 3.50,
    category: "Doces Nutella®",
  },
  {
    id: "d2",
    name: "Cannoncini",
    description: "massa . Nutella® . açúcar branco",
    image: dessertImages.cannoncini,
    price: 3.20,
    category: "Doces Nutella®",
  },
  {
    id: "d3",
    name: "Cocco Bello",
    description: "natas . leite condensado . Nutella® . coco desidratado",
    image: dessertImages.coccoBello,
    price: 4.50,
    category: "Doces Nutella®",
  },
];