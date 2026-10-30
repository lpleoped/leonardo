import type { ImageMetadata } from "astro";
import infancia from "../assets/recorrido/personajes/01-leo-infancia.webp";
import infanciaPasos from "../assets/recorrido/personajes/01-leo-infancia-pasos.webp";
import canalLeo from "../assets/recorrido/personajes/01b-leo-canal-5.webp";
import canalPasos from "../assets/recorrido/personajes/01b-leo-canal-5-pasos.webp";
import maturanaLeo from "../assets/recorrido/personajes/02-leo-maturana.webp";
import maturanaPasos from "../assets/recorrido/personajes/02-leo-maturana-pasos.webp";
import isboLeo from "../assets/recorrido/personajes/03-leo-isbo.webp";
import isboPasos from "../assets/recorrido/personajes/03-leo-isbo-pasos.webp";
import ibmLeo from "../assets/recorrido/personajes/04-leo-ibm-inicial.webp";
import ibmPasos from "../assets/recorrido/personajes/04-leo-ibm-inicial-pasos.webp";
import tiendamiaLeo from "../assets/recorrido/personajes/05-leo-tiendamia.webp";
import tiendamiaPasos from "../assets/recorrido/personajes/05-leo-tiendamia-pasos.webp";
import actual from "../assets/recorrido/personajes/06-leo-actual.webp";
import actualPasos from "../assets/recorrido/personajes/06-leo-actual-pasos.webp";
import giro1 from "../assets/recorrido/personajes/06-leo-actual-transicion-01.webp";
import giro2 from "../assets/recorrido/personajes/06-leo-actual-transicion-02.webp";
import frente from "../assets/recorrido/personajes/06-leo-actual-frente.webp";
import fachadaCanal from "../assets/recorrido/lugares/01b-canal-5.webp";
import fachadaJuan from "../assets/recorrido/lugares/01-juan-xxiii.webp";
import fachadaMaturana from "../assets/recorrido/lugares/02-maturana.webp";
import fachadaIsbo from "../assets/recorrido/lugares/03-isbo.webp";
import fachadaIbm from "../assets/recorrido/lugares/04-ibm-inicial.webp";
import fachadaOrt from "../assets/recorrido/lugares/04b-ort.webp";
import fachadaTiendamia from "../assets/recorrido/lugares/05-tiendamia.webp";
import fachadaIbmHoy from "../assets/recorrido/lugares/06-ibm-actual.webp";
import logoJuan from "../assets/recorrido/logos/juan-xxiii.png";
import logoMaturana from "../assets/recorrido/logos/maturana.png";
import logoIsbo from "../assets/recorrido/logos/isbo.png";
import logoIbm from "../assets/recorrido/logos/ibm.webp";
import logoOrt from "../assets/recorrido/logos/universidad-ort-uruguay-logo.png";
import logoTiendamia from "../assets/recorrido/logos/tiendamia.jpg";

export type Figura = {
  id: string;
  quieto: ImageMetadata;
  pasos?: ImageMetadata;
  /** Tamaño respecto del adulto, con los pies en el mismo suelo. */
  escala: number;
};

/** El orden es el del camino: el niño abre, el de hoy cierra de frente. */
export const figuras: Figura[] = [
  { id: "infancia", quieto: infancia, pasos: infanciaPasos, escala: 0.74 },
  { id: "canal", quieto: canalLeo, pasos: canalPasos, escala: 0.81 },
  { id: "maturana", quieto: maturanaLeo, pasos: maturanaPasos, escala: 0.86 },
  { id: "isbo", quieto: isboLeo, pasos: isboPasos, escala: 0.93 },
  { id: "ibm", quieto: ibmLeo, pasos: ibmPasos, escala: 1 },
  { id: "tiendamia", quieto: tiendamiaLeo, pasos: tiendamiaPasos, escala: 1 },
  { id: "actual", quieto: actual, pasos: actualPasos, escala: 1 },
  { id: "giro-1", quieto: giro1, escala: 1 },
  { id: "giro-2", quieto: giro2, escala: 1 },
  { id: "frente", quieto: frente, escala: 1 },
];

export type Recorte = {
  x: number;
  y: number;
  ancho: number;
  alto: number;
  lienzoAncho: number;
  lienzoAlto: number;
};

export type EscenaLugar = {
  fachada: ImageMetadata;
  logo?: ImageMetadata;
  /** Posición del logo sobre el cartel, en porcentajes del marco 3/2. */
  logoEstilo?: string;
  recorte?: Recorte;
};

/**
 * El strip avanza lineal con el scroll: sin mesetas, para que no se adelanten
 * los cuerpos mientras el edificio se queda quieto.
 * Cada cuerpo cubre su lugar y cambia recién cuando el siguiente ya manda.
 * El uniforme de Maturana sale en el liceo. El de IBM sigue en la ORT.
 * Al final llega a la IBM de hoy, se da vuelta y el scroll hace una pausa corta.
 */
export function cssDelCamino(slugs: string[]): string {
  const fmt = (valor: number) => (Math.round(Math.min(100, Math.max(0, valor)) * 1000) / 1000).toString();
  const indiceDe = (slug: string) => Math.max(slugs.indexOf(slug), 0);
  const ultimo = slugs.length - 1;
  const iTienda = indiceDe("tiendamia");
  /** El último tramo es IBM: pasarla y mirar de frente con peso. */
  const cierreInicio = 68;
  const fade = Math.min((cierreInicio / Math.max(iTienda, 1)) * 0.12, 2.2);
  const finDe = (indice: number) =>
    Math.min(cierreInicio, ((indice + 0.72) / (iTienda + 0.72)) * cierreInicio);
  const tramo = (indice: number) =>
    `transform: translateX(calc((var(--paso) + var(--hueco)) * -${indice}))`;
  /** Deja al de hoy a la derecha de la IBM, mirando de frente. */
  const tramoFinal =
    `transform: translateX(calc((var(--paso) + var(--hueco)) * -${ultimo} - min(52cqi, var(--paso) * 0.95)))`;

  const finInfancia = finDe(0);
  const finCanal = finDe(indiceDe("canal-5"));
  const finLiceo = finDe(indiceDe("maturana-liceo"));
  const finIsbo = finDe(indiceDe("brazo-oriental"));
  const finIbm = finDe(indiceDe("ort"));
  const llegaTienda = (iTienda / (iTienda + 0.72)) * cierreInicio;
  /** Hold corto en Tiendamia; después el cierre se queda con el de hoy. */
  const quedaTienda = Math.min(cierreInicio - 1.5, llegaTienda + (cierreInicio - llegaTienda) * 0.55);
  const finTienda = cierreInicio;
  const asientaIbm = 72;
  const sobrepasa = 80;
  const turno = 82;
  const giro1 = 85;
  const giro2 = 88;
  const fundidoGiro = 1.6;
  const fadeCierre = 2.2;

  const bloques: string[] = [];
  /** entra y sale son el ancho del fundido. El que sale y el que entra usan el mismo ancho. */
  const suma = (id: string, desde: number, hasta: number, escala: number, modo: "abre" | "sigue" | "cierra", entra: number, sale: number) => {
    const cuerpo = `transform: scale(${escala})`;
    if (modo === "abre") {
      bloques.push(`@keyframes etapa-${id} { 0%, ${fmt(hasta)}% { opacity: 1; ${cuerpo}; } ${fmt(hasta + sale)}%, 100% { opacity: 0; ${cuerpo}; } }`);
      return;
    }
    if (modo === "cierra") {
      bloques.push(`@keyframes etapa-${id} { 0%, ${fmt(desde)}% { opacity: 0; ${cuerpo}; } ${fmt(desde + entra)}%, 100% { opacity: 1; ${cuerpo}; } }`);
      return;
    }
    bloques.push(`@keyframes etapa-${id} { 0%, ${fmt(desde)}% { opacity: 0; ${cuerpo}; } ${fmt(desde + entra)}%, ${fmt(hasta)}% { opacity: 1; ${cuerpo}; } ${fmt(hasta + sale)}%, 100% { opacity: 0; ${cuerpo}; } }`);
  };

  suma("infancia", 0, finInfancia, 0.74, "abre", 0, fade);
  suma("canal", finInfancia, finCanal, 0.81, "sigue", fade, fade);
  suma("maturana", finCanal, finLiceo, 0.86, "sigue", fade, fade);
  suma("isbo", finLiceo, finIsbo, 0.93, "sigue", fade, fade);
  suma("ibm", finIsbo, finIbm, 1, "sigue", fade, fade);
  suma("tiendamia", finIbm, finTienda, 1, "sigue", fade, fadeCierre);
  suma("actual", finTienda, turno, 1, "sigue", fadeCierre, fundidoGiro);
  suma("giro-1", turno, giro1, 1, "sigue", fundidoGiro, fundidoGiro);
  suma("giro-2", giro1, giro2, 1, "sigue", fundidoGiro, fundidoGiro);
  suma("frente", giro2, 100, 1, "cierra", fundidoGiro, 0);

  /** Llega a la IBM, la pasa y se queda; el de frente cierra con énfasis. */
  bloques.push(`@keyframes avanzar {
    from { ${tramo(0)}; }
    ${fmt(llegaTienda)}%, ${fmt(quedaTienda)}% { ${tramo(iTienda)}; }
    ${fmt(asientaIbm)}% { ${tramo(ultimo)}; }
    ${fmt(sobrepasa)}%, 100% { ${tramoFinal}; }
  }`);
  bloques.push(`@keyframes crecer {
    0%, ${fmt(asientaIbm)}% { transform: scale(1); }
    ${fmt(giro2)}% { transform: scale(1.08); }
    100% { transform: scale(1.12); }
  }`);
  /** Camina frente a la IBM; al girar se corta el paso y queda de frente. */
  bloques.push(`.camino { --freno: ${fmt(turno / 100)}; }`);
  return bloques.join("\n");
}

export const escenas: Record<string, EscenaLugar> = {
  maturana: {
    fachada: fachadaMaturana,
    logo: logoMaturana,
    logoEstilo: "left:59%;top:43%;width:9.2%",
  },
  "canal-5": {
    fachada: fachadaCanal,
  },
  "maturana-liceo": {
    fachada: fachadaMaturana,
    logo: logoMaturana,
    logoEstilo: "left:59%;top:43%;width:9.2%",
  },
  "juan-xxiii": {
    fachada: fachadaJuan,
    logo: logoJuan,
    logoEstilo: "left:65.2%;top:61.2%;width:8.4%",
  },
  "brazo-oriental": {
    fachada: fachadaIsbo,
    logo: logoIsbo,
    logoEstilo: "left:51.5%;top:47.5%;width:12%",
  },
  ibm: {
    fachada: fachadaIbm,
    logo: logoIbm,
    logoEstilo: "left:56.5%;top:69.2%;width:16%",
  },
  ort: {
    fachada: fachadaOrt,
    logo: logoOrt,
    logoEstilo: "left:36.6%;top:71.8%;width:9%",
  },
  tiendamia: {
    fachada: fachadaTiendamia,
    logo: logoTiendamia,
    logoEstilo: "left:52.5%;top:47%;width:22.2%",
    recorte: { x: 682, y: 584, ancho: 1194, alto: 326, lienzoAncho: 2560, lienzoAlto: 1440 },
  },
  "ibm-hoy": {
    fachada: fachadaIbmHoy,
    logo: logoIbm,
    logoEstilo: "left:60%;top:73.5%;width:15%",
  },
};
