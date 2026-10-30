import type { ImageMetadata } from "astro";
import amigosMaturana from "../assets/recorrido/maturana-liceo/leo-amigos-adolescencia.jpg";
import amigosAulaMaturana from "../assets/recorrido/maturana-liceo/leo-amigos-adolescencia2.jpg";
import personalMaturana from "../assets/recorrido/maturana-liceo/leo-liceo-personal.jpg";
import grupoMaturana from "../assets/recorrido/maturana-liceo/leo-liceo.jpg";
import paintball from "../assets/recorrido/maturana-liceo/leo-paintball.jpg";
import pasando from "../assets/recorrido/maturana-liceo/leo-pasando-maturana.jpg";
import companerosIsbo from "../assets/recorrido/brazo-oriental/companeros-isbo.jpg";
import diversionIsbo from "../assets/recorrido/brazo-oriental/leo-clase-diversion.jpg";
import compasIsbo from "../assets/recorrido/brazo-oriental/leo-compas-clase.jpg";
import proyectoIsbo from "../assets/recorrido/brazo-oriental/proyecto-entrega.jpg";
import informeIsbo from "../assets/recorrido/brazo-oriental/informe-sigen.png";
import fachadaCanal from "../assets/recorrido/canal-5/Canal-5.webp";
import logoBanda from "../assets/recorrido/canal-5/img-6574.jpg";
import micCanal from "../assets/recorrido/canal-5/img-6583.png";
import escenarioCanal from "../assets/recorrido/canal-5/img-6584.png";
import equipoIbm from "../assets/recorrido/ibm/equipo-almuerzo.jpg";
import cenaIbmHoy from "../assets/recorrido/ibm-hoy/cena-equipo.jpg";
import reunionIbmHoy from "../assets/recorrido/ibm-hoy/reunion-equipo.jpg";
import mesaIbmHoy from "../assets/recorrido/ibm-hoy/mesa-trabajo.jpg";
import colombiaAzotea from "../assets/recorrido/tiendamia/colombia-azotea.jpg";
import mesaCompanero from "../assets/recorrido/tiendamia/mesa-companero.jpg";
import mesaTrabajo from "../assets/recorrido/tiendamia/mesa-trabajo.jpg";
import equipoHoodies from "../assets/recorrido/tiendamia/equipo-hoodies.jpg";
import terrazaMarca from "../assets/recorrido/tiendamia/terraza-marca.jpg";
import almuerzoEquipo from "../assets/recorrido/tiendamia/almuerzo-equipo.jpg";
import escolaridadOrt from "../assets/recorrido/ort/certificado-escolaridad.png";

export type CeldaMosaico = {
  id: string;
  imagen: ImageMetadata;
  alt: string;
  altEn: string;
  celda: string;
  fit?: "cover" | "contain";
  posicion?: string;
  ratio?: string;
};

export type MosaicoLugar = {
  layout: "seis" | "cinco" | "cuatro" | "tres" | "uno" | "documento" | "tiendamia";
  pie: string;
  pieEn: string;
  celdas: CeldaMosaico[];
};

/** Fotos íntimas de un lugar. La figura del camino se apoya en este pasaje. */
export const mosaicos: Record<string, MosaicoLugar> = {
  "maturana-liceo": {
    layout: "seis",
    pie: "Un pasaje por el Maturana: el uniforme, los amigos, los días.",
    pieEn: "A passage through Maturana: the uniform, the friends, the days.",
    celdas: [
      {
        id: "grupo",
        imagen: grupoMaturana,
        alt: "La clase del Maturana, junta en el aula con el uniforme del colegio.",
        altEn: "The Maturana class together in the classroom, in school uniform.",
        celda: "grupo",
      },
      {
        id: "personal",
        imagen: personalMaturana,
        alt: "Leonardo con el sweater del Maturana, el escudo SFS y los auriculares al cuello.",
        altEn: "Leonardo in the Maturana sweater, the SFS crest, and headphones around his neck.",
        celda: "personal",
      },
      {
        id: "stairs",
        imagen: pasando,
        alt: "Pasillo del liceo: Leonardo bajando la escalera entre compañeros.",
        altEn: "A school hallway: Leonardo coming down the stairs among classmates.",
        celda: "stairs",
      },
      {
        id: "amigos-aula",
        imagen: amigosAulaMaturana,
        alt: "Amigos del Maturana en el aula, al final de una etapa.",
        altEn: "Friends from Maturana in the classroom, at the end of a stage.",
        celda: "amigos-aula",
      },
      {
        id: "amigos",
        imagen: amigosMaturana,
        alt: "El grupo de amigos fuera del colegio, de noche.",
        altEn: "The group of friends outside school, at night.",
        celda: "amigos",
      },
      {
        id: "salida",
        imagen: paintball,
        alt: "Salida con amigos del liceo, listos para jugar paintball.",
        altEn: "A day out with high-school friends, ready for paintball.",
        celda: "salida",
      },
    ],
  },
  "brazo-oriental": {
    layout: "cinco",
    pie: "Un pasaje por el ISBO: la banda, el aula y el proyecto final.",
    pieEn: "A passage through ISBO: the crew, the classroom, and the final project.",
    celdas: [
      {
        id: "companeros",
        imagen: companerosIsbo,
        alt: "Leonardo y compañeros del ISBO, de traje, en una foto juntos.",
        altEn: "Leonardo and ISBO classmates in suits, posing together.",
        celda: "grupo",
      },
      {
        id: "diversion",
        imagen: diversionIsbo,
        alt: "Leonardo sonriendo en clase, con un compañero a punto de tirarle un papel.",
        altEn: "Leonardo smiling in class, with a classmate about to throw a paper ball.",
        celda: "personal",
      },
      {
        id: "compas",
        imagen: compasIsbo,
        alt: "Leonardo con un compañero del ISBO, auriculares al cuello.",
        altEn: "Leonardo with an ISBO classmate, headphones around his neck.",
        celda: "stairs",
      },
      {
        id: "proyecto",
        imagen: proyectoIsbo,
        alt: "Leonardo sostiene el tomo del proyecto final TryHard.",
        altEn: "Leonardo holding the final TryHard project volume.",
        celda: "entrega",
      },
      {
        id: "informe",
        imagen: informeIsbo,
        alt: "Portada del proyecto S.I.G.E.N., con Leonardo como coordinador.",
        altEn: "Cover of the S.I.G.E.N. project, with Leonardo as coordinator.",
        celda: "documento",
      },
    ],
  },
  "canal-5": {
    layout: "cuatro",
    pie: "Un pasaje por Canal 5: La Banda, el micrófono y el archivo.",
    pieEn: "A passage through Canal 5: La Banda, the mic, and the archive.",
    celdas: [
      {
        id: "fachada",
        imagen: fachadaCanal,
        alt: "Fachada de Canal 5 en Montevideo, con el 5 y los 60 años.",
        altEn: "Canal 5 facade in Montevideo, with the 5 and the 60-year mark.",
        celda: "grupo",
      },
      {
        id: "logo",
        imagen: logoBanda,
        alt: "Título del programa La Banda, del archivo de la Universidad de la República.",
        altEn: "Title card for La Banda, from the University of the Republic archive.",
        celda: "personal",
      },
      {
        id: "microfono",
        imagen: micCanal,
        alt: "Leonardo niño, con micrófono, en una captura del programa.",
        altEn: "Leonardo as a child, with a microphone, in a program still.",
        celda: "stairs",
      },
      {
        id: "escenario",
        imagen: escenarioCanal,
        alt: "Leonardo en escena con otros niños de La Banda, frente al micrófono.",
        altEn: "Leonardo on stage with other La Banda kids, at the microphone.",
        celda: "entrega",
      },
    ],
  },
  ort: {
    layout: "documento",
    pie: "Certificado de escolaridad: Analista en Tecnologías de la Información.",
    pieEn: "Academic transcript: Analista en Tecnologías de la Información.",
    celdas: [
      {
        id: "escolaridad",
        imagen: escolaridadOrt,
        alt: "Certificado de escolaridad de Leonardo Pedreira en Universidad ORT Uruguay, con promedio 93.",
        altEn: "Leonardo Pedreira’s academic transcript at Universidad ORT Uruguay, with a 93 average.",
        celda: "grupo",
      },
    ],
  },
  ibm: {
    layout: "uno",
    pie: "Un pasaje por la primera IBM: el equipo, la mesa, el oficio.",
    pieEn: "A passage through the first IBM: the team, the table, the craft.",
    celdas: [
      {
        id: "equipo",
        imagen: equipoIbm,
        alt: "El equipo de IBM en un almuerzo al aire libre, juntos alrededor de la mesa.",
        altEn: "The IBM team at an outdoor lunch, together around the table.",
        celda: "grupo",
      },
    ],
  },
  "ibm-hoy": {
    layout: "tres",
    pie: "IBM, hoy.",
    pieEn: "IBM, today.",
    celdas: [
      {
        id: "cena",
        imagen: cenaIbmHoy,
        alt: "El equipo de IBM en una cena formal, alrededor de una mesa larga.",
        altEn: "The IBM team at a formal dinner, around a long table.",
        celda: "grupo",
      },
      {
        id: "reunion",
        imagen: reunionIbmHoy,
        alt: "Compañeros de IBM juntos en una reunión informal, con vasos en la mano.",
        altEn: "IBM teammates together at an informal gathering, glasses in hand.",
        celda: "personal",
      },
      {
        id: "mesa",
        imagen: mesaIbmHoy,
        alt: "Leonardo y tres compañeros frente a las laptops, con mate en la mesa.",
        altEn: "Leonardo and three teammates at their laptops, with mate on the table.",
        celda: "stairs",
      },
    ],
  },
  tiendamia: {
    layout: "tiendamia",
    pie: "Un pasaje por Tiendamia: Colombia, la mesa, el equipo WorldClass.",
    pieEn: "A passage through Tiendamia: Colombia, the table, the WorldClass team.",
    celdas: [
      {
        id: "colombia",
        imagen: colombiaAzotea,
        alt: "El equipo de Tiendamia en una azotea de Colombia, con la bufanda del país.",
        altEn: "The Tiendamia team on a rooftop in Colombia, holding the country’s scarf.",
        celda: "grupo",
      },
      {
        id: "companero",
        imagen: mesaCompanero,
        alt: "Leonardo con un compañero en la oficina, sonriendo frente a la laptop.",
        altEn: "Leonardo with a teammate in the office, smiling at the laptop.",
        celda: "personal",
      },
      {
        id: "mesa",
        imagen: mesaTrabajo,
        alt: "El equipo reunido alrededor de la mesa de trabajo, con laptops abiertas.",
        altEn: "The team gathered around the work table, laptops open.",
        celda: "stairs",
      },
      {
        id: "hoodies",
        imagen: equipoHoodies,
        alt: "Seis personas con el hoodie de Tiendamia y la bufanda de Colombia sobre la mesa.",
        altEn: "Six people in Tiendamia hoodies, with the Colombia scarf on the table.",
        celda: "viaje",
      },
      {
        id: "terraza",
        imagen: terrazaMarca,
        alt: "Dos compañeros en la terraza de la oficina, uno con la marca Tiendamia en la manga.",
        altEn: "Two teammates on the office terrace, one with the Tiendamia mark on the sleeve.",
        celda: "terraza",
      },
      {
        id: "almuerzo",
        imagen: almuerzoEquipo,
        alt: "El equipo grande de Tiendamia en un almuerzo, casi todos con el hoodie de la marca.",
        altEn: "The larger Tiendamia team at lunch, most of them in the brand hoodie.",
        celda: "salida",
      },
    ],
  },
};
