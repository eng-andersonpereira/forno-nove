export type Option = { label: string; price: number };

export type Item = {
  id: string;
  category: "pizzas" | "bebidas";
  name: string;
  desc: string;
  options: Option[];
  img?: string;   // foto (opcional)
  emoji?: string; // usado quando não há foto
};

const tam = (p: [number, number, number]): Option[] => [
  { label: "Pequena", price: p[0] },
  { label: "Média", price: p[1] },
  { label: "Grande", price: p[2] },
];

export const CATEGORIES = [
  { id: "pizzas", label: "Pizzas" },
  { id: "bebidas", label: "Bebidas" },
] as const;

export const ITEMS: Item[] = [
  { id: "marguerita", category: "pizzas", name: "Marguerita", desc: "Molho de tomate, muçarela de búfala, manjericão e azeite.", options: tam([32, 42, 52]), img: "/images/marguerita.jpg" },
  { id: "calabresa", category: "pizzas", name: "Calabresa acebolada", desc: "Calabresa artesanal, cebola roxa, muçarela e orégano.", options: tam([34, 44, 54]), img: "/images/calabresa.jpg" },
  { id: "quatro-queijos", category: "pizzas", name: "Quatro queijos", desc: "Muçarela, gorgonzola, provolone e parmesão.", options: tam([38, 48, 60]), img: "/images/quatro-queijos.jpg" },
  { id: "frango", category: "pizzas", name: "Frango com catupiry", desc: "Frango desfiado temperado, catupiry e milho.", options: tam([36, 46, 58]), img: "/images/frango.jpg" },
  { id: "portuguesa", category: "pizzas", name: "Portuguesa", desc: "Presunto, ovo, cebola, pimentão, azeitona e muçarela.", options: tam([36, 46, 58]), img: "/images/portuguesa.jpg" },
  { id: "chocolate", category: "pizzas", name: "Chocolate com morango", desc: "Chocolate ao leite derretido e morangos frescos.", options: tam([34, 44, 54]), img: "/images/chocolate.jpg" },

  { id: "refri", category: "bebidas", name: "Refrigerante", desc: "Bem gelado. Consulte os sabores no pedido.", emoji: "🥤", options: [{ label: "Lata 350 ml", price: 6 }, { label: "1 litro", price: 9 }, { label: "2 litros", price: 14 }] },
  { id: "suco", category: "bebidas", name: "Suco natural", desc: "Feito na hora. Laranja, maracujá ou acerola.", emoji: "🍊", options: [{ label: "Copo 300 ml", price: 8 }, { label: "Jarra 1 litro", price: 18 }] },
  { id: "agua", category: "bebidas", name: "Água mineral", desc: "Com ou sem gás.", emoji: "💧", options: [{ label: "Sem gás 500 ml", price: 3 }, { label: "Com gás 500 ml", price: 4 }] },
  { id: "cerveja", category: "bebidas", name: "Cerveja long neck", desc: "355 ml. Venda para maiores de 18 anos.", emoji: "🍺", options: [{ label: "Unidade", price: 10 }, { label: "Combo 3 unidades", price: 27 }] },
];

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });