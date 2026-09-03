export const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5511961425394";

// Frete grátis garantido para Minas Gerais, com as mesmas condições
// estendidas para estes outros estados — válido para toda a linha.
export const FREE_SHIPPING_HIGHLIGHT = "Minas Gerais";
export const FREE_SHIPPING_STATES = ["SP", "RJ", "PR", "MT", "SC"];
export const FREE_SHIPPING_STATES_LABEL = "MG, SP, RJ, PR, MT e SC";

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export function whatsappUrlFor(product: Product) {
  const text = encodeURIComponent(`Olá! Quero falar sobre o ${product.name}.`);
  return `${WHATSAPP_URL}&text=${text}`;
}

export type Product = {
  slug: string;
  name: string;
  capacity: number;
  liters: number;
  dimensions: string;
  line: string;
  jets: number;
  price: number;
  originalPrice?: number;
  installments: number;
  tagline: string;
  description: string;
  image: string;
  hasRealPhoto: boolean;
  video?: string;
  videoPoster?: string;
  color: string;
  colorSoft: string;
  colorDeep: string;
};

export const products: Product[] = [
  {
    slug: "barcelona",
    name: "Spa Barcelona",
    capacity: 4,
    liters: 700,
    dimensions: "1,70 x 1,60 x 0,80m",
    line: "Linha Basic",
    jets: 8,
    price: 9497,
    installments: 6,
    tagline: "O clássico compacto",
    description:
      "O ponto de partida ideal para casais ou famílias pequenas. Formato enxuto que cabe em varandas e áreas compactas, sem abrir mão da potência de hidromassagem WT Fibras.",
    image: "/images/spa-barcelona.png",
    hasRealPhoto: true,
    video: "/videos/spa-barcelona.mp4",
    videoPoster: "/images/spa-barcelona-poster.jpg",
    color: "#1B4F72",
    colorSoft: "#8EC6E8",
    colorDeep: "#0A2540",
  },
  {
    slug: "redondo",
    name: "Spa Redondo",
    capacity: 4,
    liters: 800,
    dimensions: "1,80 x 1,80 x 0,95m",
    line: "Linha Basic",
    jets: 8,
    price: 8497,
    originalPrice: 9177,
    installments: 6,
    tagline: "Conversa em roda",
    description:
      "O formato circular reúne todo mundo de frente um para o outro — perfeito para famílias que gostam de compartilhar o momento de água quente sem hierarquia de lugar.",
    image: "/images/spa-redondo.png",
    hasRealPhoto: true,
    video: "/videos/spa-redondo.mp4",
    videoPoster: "/images/spa-redondo-poster.jpg",
    color: "#127C82",
    colorSoft: "#9FE7E2",
    colorDeep: "#04302F",
  },
  {
    slug: "quadrado",
    name: "Spa Quadrado",
    capacity: 5,
    liters: 1050,
    dimensions: "2,00 x 2,00 x 0,90m",
    line: "Linha Basic",
    jets: 10,
    price: 9699,
    originalPrice: 10977,
    installments: 6,
    tagline: "Equilíbrio em cada ângulo",
    description:
      "Linhas retas, proporções generosas e a versatilidade de encaixar em qualquer projeto. O modelo mais equilibrado da linha WT Fibras, entre espaço e praticidade.",
    image: "/images/spa-quadrado.png",
    hasRealPhoto: true,
    video: "/videos/spa-quadrado.mp4",
    videoPoster: "/images/spa-quadrado-poster.jpg",
    color: "#004D7C",
    colorSoft: "#8FCBEA",
    colorDeep: "#022A42",
  },
  {
    slug: "copacabana",
    name: "Spa Copacabana",
    capacity: 7,
    liters: 1750,
    dimensions: "2,40 x 2,20 x 0,95m",
    line: "Linha Basic",
    jets: 20,
    price: 10897,
    installments: 6,
    tagline: "Clima de praia, todo dia",
    description:
      "Inspirado no verão carioca. Espaço de sobra para reunir os amigos, jatos distribuídos em toda a extensão e a sensação de estar em um resort particular — sem sair de casa.",
    image: "/images/spa-copacabana.png",
    hasRealPhoto: true,
    video: "/videos/spa-copacabana.mp4",
    videoPoster: "/images/spa-copacabana-poster.jpg",
    color: "#0E8F6B",
    colorSoft: "#8FE8C4",
    colorDeep: "#053B2E",
  },
  {
    slug: "itaparica",
    name: "Spa Itaparica",
    capacity: 8,
    liters: 1690,
    dimensions: "2,10 x 2,10 x 1,00m",
    line: "Linha Relax",
    jets: 20,
    price: 10897,
    installments: 6,
    tagline: "A ilha particular",
    description:
      "Nosso topo de linha. Formato exclusivo pensado para cantos e áreas de destaque, com a profundidade e o acabamento da Linha Relax — para o grupo inteiro, sem pressa nenhuma.",
    image: "/images/spa-itaparica.png",
    hasRealPhoto: true,
    video: "/videos/spa-itaparica.mp4",
    videoPoster: "/images/spa-itaparica-poster.jpg",
    color: "#3B3178",
    colorSoft: "#B8AEEA",
    colorDeep: "#191540",
  },
];
