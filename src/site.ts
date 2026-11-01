export const sitio = {
  nombre: "Leonardo Pedreira",
  marca: "leonardo",
  rol: "",
  rolEn: "",
  frase: "De entender problemas a construir soluciones.",
  fraseEn: "From understanding problems to building solutions.",
  fraseAntes: "De entender problemas a",
  fraseAntesEn: "From understanding problems to",
  fraseGolpe: "construir soluciones.",
  fraseGolpeEn: "building solutions.",
  instagram: "https://www.instagram.com/lp.leonardo_/",
  behance: "",
  linkedin: "https://www.linkedin.com/in/leonardo-pedreira/",
  github: "https://github.com/lpleoped",
  email: "lp.leonardo.pedreira@hotmail.com",
  lugar: "Montevideo, Uruguay.",
  lugarEn: "From Montevideo, Uruguay.",
  // Embed oficial: la playlist debe ser pública en Spotify (no colaborativa).
  spotify: {
    tipo: "playlist" as const,
    id: "7lyiuvJYzRuVJrumxPqvA6",
    titulo: "Playlist de Leonardo Pedreira",
  },
};

export type Galardon = {
  festival: string;
  distincion: string;
  categoria: string;
  anio: number;
};

export const galardones: Galardon[] = [];
