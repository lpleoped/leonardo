import type { ImageMetadata } from "astro";
import fighter from "../assets/archivo/artes-marciales/leo-fighter.jpg";
import kick from "../assets/archivo/artes-marciales/leo-kick.jpg";
import frontKick from "../assets/archivo/artes-marciales/leo-front-kick.jpg";
import gym from "../assets/archivo/artes-marciales/gym-grupo.jpg";
import pesaje from "../assets/archivo/artes-marciales/leo-pesaje.jpg";
import vendaje from "../assets/archivo/artes-marciales/leo-vendaje.jpg";
import cantando from "../assets/archivo/canto/leo-cantando.jpg";
import guitarra from "../assets/archivo/canto/leo-guitarra.jpg";
import evento from "../assets/archivo/canto/cantando-evento.jpg";
import cantandoDos from "../assets/archivo/canto/leo-cantando-2.jpg";
import familiaPrincipal from "../assets/archivo/familia/familia-principal.jpg";
import papaCaballo from "../assets/archivo/familia/leo-papa-caballo.jpg";
import bebeMama from "../assets/archivo/familia/leo-bebe-mama.jpg";
import gabiPequenos from "../assets/archivo/familia/leo-gabi-pequenos.jpg";
import familiaAgua from "../assets/archivo/familia/leo-familia-agua.jpg";
import familiaMaterna from "../assets/archivo/familia/leo-familia-materna.jpg";
import miFamilia from "../assets/archivo/familia/mi-familia.jpg";

function ratioDe(imagen: ImageMetadata) {
  return `${imagen.width} / ${imagen.height}`;
}

export type CeldaFaceta = {
  imagen: ImageMetadata;
  alt: string;
  altEn: string;
  celda: string;
  fit?: "cover" | "contain";
  posicion?: string;
  ratio?: string;
};

export type MosaicoFaceta = {
  pie: string;
  pieEn: string;
  celdas: CeldaFaceta[];
};

export type RetratoPersona = {
  imagen: ImageMetadata;
  alt: string;
  altEn: string;
  posicion?: string;
  ratio?: string;
  fit?: "cover" | "contain";
};

export const retratosPersona: Record<string, RetratoPersona> = {
  "César Pedreira": {
    imagen: papaCaballo,
    alt: "César a caballo, Leonardo al lado.",
    altEn: "César on horseback, Leonardo beside him.",
    posicion: "center 42%",
    ratio: ratioDe(papaCaballo),
  },
  "Lidia Barboza": {
    imagen: bebeMama,
    alt: "Lidia con Leonardo bebé.",
    altEn: "Lidia with Leonardo as a baby.",
    posicion: "center 46%",
    ratio: ratioDe(bebeMama),
  },
  "Gabriela Pedreira": {
    imagen: gabiPequenos,
    alt: "Leonardo y Gabriela, pequeños.",
    altEn: "Leonardo and Gabriela as kids.",
    posicion: "center 42%",
    ratio: ratioDe(gabiPequenos),
  },
  "María Ester Norbis\n“Nené”": {
    imagen: familiaPrincipal,
    alt: "Nené, a la izquierda, con la familia.",
    altEn: "Nené, on the left, with the family.",
    posicion: "14% 46%",
    ratio: ratioDe(familiaPrincipal),
  },
};

export const mosaicosFaceta: Record<string, MosaicoFaceta> = {
  "artes-marciales": {
    pie: "El golpe, el gym, el pesaje, el vendaje.",
    pieEn: "The strike, the gym, the weigh-in, the wraps.",
    celdas: [
      {
        imagen: kick,
        alt: "Leonardo en el ring, una patada al cuerpo.",
        altEn: "Leonardo in the ring, a body kick.",
        celda: "golpe",
        posicion: "center 46%",
        ratio: ratioDe(kick),
      },
      {
        imagen: gym,
        alt: "El equipo del gym, juntos.",
        altEn: "The gym team, together.",
        celda: "gym",
        posicion: "center 46%",
        ratio: ratioDe(gym),
      },
      {
        imagen: pesaje,
        alt: "Leonardo en el pesaje, bajo el cartel de Uruguay.",
        altEn: "Leonardo at the weigh-in, under the Uruguay banner.",
        celda: "pesaje",
        posicion: "58% 32%",
        ratio: ratioDe(pesaje),
      },
      {
        imagen: fighter,
        alt: "Leonardo en guardia, en el predio.",
        altEn: "Leonardo in fighting stance, at the venue.",
        celda: "fighter",
        posicion: "center 38%",
        ratio: ratioDe(fighter),
      },
      {
        imagen: vendaje,
        alt: "Vendando las manos antes de salir.",
        altEn: "Wrapping the hands before going out.",
        celda: "vendaje",
        posicion: "center 48%",
        ratio: ratioDe(vendaje),
      },
      {
        imagen: frontKick,
        alt: "La jaula, el público, una patada.",
        altEn: "The cage, the crowd, a kick.",
        celda: "jaula",
        posicion: "center 44%",
        ratio: ratioDe(frontKick),
      },
    ],
  },
  canto: {
    pie: "La costa, el escenario, el estudio.",
    pieEn: "The coast, the stage, the studio.",
    celdas: [
      {
        imagen: guitarra,
        alt: "Leonardo con la guitarra al atardecer, frente al mar.",
        altEn: "Leonardo with a guitar at sunset, facing the sea.",
        celda: "costa",
        posicion: "center 58%",
        ratio: ratioDe(guitarra),
      },
      {
        imagen: cantando,
        alt: "Leonardo al micrófono, con la banda.",
        altEn: "Leonardo at the microphone, with the band.",
        celda: "escena",
        posicion: "52% 40%",
        ratio: ratioDe(cantando),
      },
      {
        imagen: evento,
        alt: "Leonardo de noche, antes de cantar.",
        altEn: "Leonardo at night, before singing.",
        celda: "retrato",
        posicion: "42% 22%",
        ratio: ratioDe(evento),
      },
      {
        imagen: cantandoDos,
        alt: "En el estudio, con micrófonos y guitarra.",
        altEn: "In the studio, with microphones and guitar.",
        celda: "trio",
        posicion: "center 38%",
        ratio: ratioDe(cantandoDos),
      },
    ],
  },
  familia: {
    pie: "Los míos.",
    pieEn: "My people.",
    celdas: [
      {
        imagen: familiaPrincipal,
        alt: "Nené, Leonardo, César, Lidia y Gabriela.",
        altEn: "Nené, Leonardo, César, Lidia and Gabriela.",
        celda: "retrato",
        fit: "contain",
        posicion: "center center",
        ratio: ratioDe(familiaPrincipal),
      },
      {
        imagen: familiaAgua,
        alt: "César, Gabriela, Lidia y Leonardo en el agua.",
        altEn: "César, Gabriela, Lidia and Leonardo in the water.",
        celda: "agua",
        posicion: "center 42%",
        ratio: ratioDe(familiaAgua),
      },
      {
        imagen: familiaMaterna,
        alt: "La familia materna, Nené al centro.",
        altEn: "The maternal family, Nené at the centre.",
        celda: "materna",
        posicion: "center 42%",
        ratio: ratioDe(familiaMaterna),
      },
      {
        imagen: miFamilia,
        alt: "Leonardo y Gabriela en la escalera, bajo las flores.",
        altEn: "Leonardo and Gabriela on the ladder, under the flowers.",
        celda: "escalera",
        posicion: "center 52%",
        ratio: ratioDe(miFamilia),
      },
    ],
  },
};

export const encuadreCara: Record<
  string,
  { fit: "cover" | "contain"; posicion: string; ratio: string; ancho: string }
> = {
  "artes-marciales": {
    fit: "cover",
    posicion: "center 44%",
    ratio: "3 / 2",
    ancho: "1.5",
  },
  canto: {
    fit: "cover",
    posicion: "center 58%",
    ratio: "1 / 1",
    ancho: "1",
  },
  familia: {
    fit: "cover",
    posicion: "center 47%",
    ratio: "4 / 3",
    ancho: "1.333",
  },
};
