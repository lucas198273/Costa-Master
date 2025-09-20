export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  available?: boolean; 
  imageUrl: string;
  notes?: string[];
  category: "infantil" | "aro20" | "aro24" | "aro26" | "aro29" | "motorizadas";
  materials?: {
    type: string;
    price: number;
  }[];
}

export const products: Product[] = [
  // 🚲 Infantil
  {
    id: "bike1",
    name: "Bicicleta Infantil Rosa",
    description: "Bicicleta aro 16 com rodinhas removíveis, ideal para crianças iniciando no pedal.",
    price: 499.90,
    available: true,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_814294-MLA88593794520_072025-F.webp",
    category: "infantil",
  },
  {
    id: "bike2",
    name: "Bicicleta Infantil Azul",
    description: "Modelo leve, aro 16, com rodinhas e cestinha frontal.",
    price: 520.00,
    available: true,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_603838-MLU77163533354_072024-F.webp",
    category: "infantil",
  },

  // 🚲 Aro 20
  {
    id: "bike3",
    name: "Bicicleta Aro 20 Urbana",
    description: "Indicada para jovens, quadro de aço carbono e freio V-Brake.",
    price: 780.00,
    available: true,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_830342-MLB76992622571_062024-F-bicicleta-aro-20-bmx-drb-bikes-driveway-206-verde-agua.webp",
    category: "aro20",
  },

  // 🚲 Aro 24
  {
    id: "bike4",
    name: "Bicicleta Aro 24 MTB",
    description: "Mountain Bike juvenil, câmbio 18 marchas e suspensão dianteira.",
    price: 950.00,
    available: true,
    imageUrl: "/assets/bike-aro24.jpg",
    category: "aro24",
  },

  // 🚲 Aro 26
  {
    id: "bike5",
    name: "Bicicleta Aro 26 Esportiva",
    description: "Quadro alumínio, 21 marchas, indicada para lazer e trilhas leves.",
    price: 1199.90,
    available: true,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_734115-MLA88901150239_072025-F.webp",
    category: "aro26",
  },

  // 🚲 Aro 29
  {
    id: "bike6",
    name: "Bicicleta Aro 29 Profissional",
    description: "Mountain Bike aro 29 com freios a disco hidráulicos e suspensão de 100mm.",
    price: 2490.00,
    available: true,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_719443-MLB89543226325_082025-F-bicicleta-aro-29-mtb-ksw-24v-shimano-freio-hidraulico-k7.webp",
    category: "aro29",
  },

  // 🚲 Motorizadas
  {
    id: "bike7",
    name: "Bicicleta Motorizada Elétrica",
    description: "Bicicleta elétrica com autonomia de até 50km, motor 350W e bateria removível.",
    price: 5200.00,
    available: true,
    imageUrl: "/assets/bike-eletrica.jpg",
    category: "motorizadas",
  },
  {
    id: "bike8",
    name: "Bicicleta Motorizada a Gasolina",
    description: "Modelo híbrido com motor 80cc a gasolina, até 50 km/h.",
    price: 3900.00,
    available: true,
    imageUrl: "/assets/bike-motorizada-gasolina.jpg",
    category: "motorizadas",
  },
];
