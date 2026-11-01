import type { ImageMetadata } from "astro";
import fighter from "../assets/archivo/artes-marciales/leo-fighter.jpg";
import kick from "../assets/archivo/artes-marciales/leo-kick.jpg";
import frontKick from "../assets/archivo/artes-marciales/leo-front-kick.jpg";
import gym from "../assets/archivo/artes-marciales/gym-grupo.jpg";
import pesaje from "../assets/archivo/artes-marciales/leo-pesaje.jpg";
import vendaje from "../assets/archivo/artes-marciales/leo-vendaje.jpg";
import afiches from "../assets/archivo/artes-marciales/afiches.jpg";
import afiche2 from "../assets/archivo/artes-marciales/leo-afiche2.jpg";
import afiche4 from "../assets/archivo/artes-marciales/leo-afiche4.jpg";
import aPunto from "../assets/archivo/artes-marciales/leoapuntodeentrar.jpg";
import chino from "../assets/archivo/artes-marciales/leo-chino corbo.jpg";
import damian from "../assets/archivo/artes-marciales/leo-damian bujan.jpg";
import damian2 from "../assets/archivo/artes-marciales/leo-damian bujan2.jpg";
import dario from "../assets/archivo/artes-marciales/leo-dario.jpg";
import enCasa from "../assets/archivo/artes-marciales/leo-encasa.jpg";
import enCasa2 from "../assets/archivo/artes-marciales/leo-encasa2.jpg";
import gymCompas from "../assets/archivo/artes-marciales/leo-gym compas.jpg";
import kick3 from "../assets/archivo/artes-marciales/leo-high-quality-kick2.jpg";
import patada from "../assets/archivo/artes-marciales/leo-patada.jpg";
import pesajeArg from "../assets/archivo/artes-marciales/leo-pesaje-argentina-3.jpg";
import pesajeArgentina from "../assets/archivo/artes-marciales/pesaje en argentina.jpg";
import tonga from "../assets/archivo/artes-marciales/leo-tonga.jpg";
import tonga2 from "../assets/archivo/artes-marciales/leo-tonga2.jpg";
import uriel from "../assets/archivo/artes-marciales/leo-uriel-noria.jpg";
import win from "../assets/archivo/artes-marciales/leo-win.jpg";
import pesajeArgentina2 from "../assets/archivo/artes-marciales/pesaje en argentina2.jpg";
import reccia from "../assets/archivo/artes-marciales/contra-francisco-reccia.jpeg";
import combateClinch from "../assets/archivo/artes-marciales/combate-clinch.jpg";
import cantando from "../assets/archivo/canto/leo-cantando.jpg";
import guitarra from "../assets/archivo/canto/leo-guitarra.jpg";
import evento from "../assets/archivo/canto/cantando-evento.jpg";
import cantandoDos from "../assets/archivo/canto/leo-cantando-2.jpg";
import cantandoBalcon from "../assets/archivo/canto/cantando-balcon.jpeg";
import familiaPrincipal from "../assets/archivo/familia/familia-principal.jpg";
import papaCaballo from "../assets/archivo/familia/leo-papa-caballo.jpg";
import bebeMama from "../assets/archivo/familia/leo-bebe-mama.jpg";
import gabiPequenos from "../assets/archivo/familia/leo-gabi-pequenos.jpg";
import familiaAgua from "../assets/archivo/familia/leo-familia-agua.jpg";
import familiaMaterna from "../assets/archivo/familia/leo-familia-materna.jpg";
import miFamilia from "../assets/archivo/familia/mi-familia.jpg";
import familiaPrincipalNueva from "../assets/archivo/familia/mi-familia-principal.jpg";
import bebeMamaNueva from "../assets/archivo/familia/leo-bebe-mama.jpg";
import familiaDos from "../assets/archivo/familia/leo-familia2.jpg";
import familiaAguaNueva from "../assets/archivo/familia/leo-familia-agua.jpg";
import gabiPequenosTres from "../assets/archivo/familia/leo-gabi-pequenos-3.jpg";
import gabiPequenosMoto from "../assets/archivo/familia/leo-gabi-pequenos-moto.jpg";
import mamaGabiFiesta from "../assets/archivo/familia/leo-mama-gabi-fiesta.jpg";
import gabiPequenosDos from "../assets/archivo/familia/leo-gabi-pequenos2.jpg";
import gabiPequenosJardin from "../assets/archivo/familia/leo-gabi-pequenos.jpg";
import familiaActual6490 from "../assets/archivo/familia/familia-actual-6490.jpeg";
import familiaActual5006 from "../assets/archivo/familia/familia-actual-5006.jpeg";
import familiaActual5218 from "../assets/archivo/familia/familia-actual-5218.jpeg";
import familiaActual6475 from "../assets/archivo/familia/familia-actual-6475.jpeg";
import lorenzoPedreira from "../assets/archivo/familia/lorenzo-pedreira.png";

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
  "Lorenzo Pedreira": {
    imagen: lorenzoPedreira,
    alt: "Lorenzo sonríe con auriculares frente a una notebook.",
    altEn: "Lorenzo smiling with headphones in front of a laptop.",
    posicion: "center 28%",
    ratio: ratioDe(lorenzoPedreira),
  },
};

export const mosaicosFaceta: Record<string, MosaicoFaceta> = {
  "artes-marciales": {
    pie: "Afiches, equipo, entrenamiento, combates y todo lo que rodea al ring.",
    pieEn: "Posters, team, training, fights and everything around the ring.",
    celdas: [
      { imagen: afiches, alt: "Afiche de Kick Boxing Amateur 2013.", altEn: "2013 Amateur Kick Boxing poster.", celda: "afiche afiche--alto", fit: "contain", ratio: ratioDe(afiches) },
      { imagen: afiche2, alt: "Afiche del torneo International Kick Boxing VIII.", altEn: "International Kick Boxing VIII poster.", celda: "afiche afiche--alto", fit: "contain", ratio: ratioDe(afiche2) },
      { imagen: afiche4, alt: "Afiche de Muay Thai y Kick Boxing en jaula.", altEn: "Muay Thai and cage Kick Boxing poster.", celda: "afiche afiche--alto", fit: "contain", ratio: ratioDe(afiche4) },
      {
        imagen: kick,
        alt: "Leonardo en el ring, una patada al cuerpo.",
        altEn: "Leonardo in the ring, a body kick.",
        celda: "golpe",
        posicion: "center 46%",
        ratio: ratioDe(kick),
      },
      { imagen: kick3, alt: "Combate en el ring, golpe al cuerpo.", altEn: "Ring fight, body strike.", celda: "combate combate--ancho", ratio: ratioDe(kick3) },
      { imagen: patada, alt: "Patada en una pelea dentro de la jaula.", altEn: "Kick in a cage fight.", celda: "combate", ratio: ratioDe(patada) },
      { imagen: combateClinch, alt: "Clinch durante un combate en el ring.", altEn: "Clinch during a fight in the ring.", celda: "combate", ratio: ratioDe(combateClinch) },
      {
        imagen: gym,
        alt: "El equipo del gym, juntos.",
        altEn: "The gym team, together.",
        celda: "gym",
        posicion: "center 46%",
        ratio: ratioDe(gym),
      },
      { imagen: gymCompas, alt: "Grupo del gym con diplomas.", altEn: "Gym group with certificates.", celda: "grupo grupo--ancho", ratio: ratioDe(gymCompas) },
      { imagen: damian2, alt: "Equipo reunido en el gimnasio.", altEn: "Team gathered at the gym.", celda: "grupo grupo--ancho", ratio: ratioDe(damian2) },
      { imagen: tonga2, alt: "Compañeros de entrenamiento juntos.", altEn: "Training partners together.", celda: "grupo", ratio: ratioDe(tonga2) },
      { imagen: tonga, alt: "Leonardo con compañeros del gimnasio.", altEn: "Leonardo with gym teammates.", celda: "grupo", ratio: ratioDe(tonga) },
      { imagen: chino, alt: "Leonardo con un campeón y su trofeo.", altEn: "Leonardo with a champion and his trophy.", celda: "grupo", ratio: ratioDe(chino) },
      { imagen: damian, alt: "Leonardo junto a Damián Buján y un compañero.", altEn: "Leonardo with Damian Bujan and a teammate.", celda: "grupo", ratio: ratioDe(damian) },
      { imagen: dario, alt: "Leonardo y un compañero en el ring.", altEn: "Leonardo and a teammate in the ring.", celda: "grupo", ratio: ratioDe(dario) },
      { imagen: uriel, alt: "Leonardo con Uriel Noria.", altEn: "Leonardo with Uriel Noria.", celda: "grupo", ratio: ratioDe(uriel) },
      {
        imagen: pesaje,
        alt: "Leonardo en el pesaje, bajo el cartel de Uruguay.",
        altEn: "Leonardo at the weigh-in, under the Uruguay banner.",
        celda: "pesaje",
        posicion: "58% 32%",
        ratio: ratioDe(pesaje),
      },
      { imagen: pesajeArg, alt: "Pesaje de Leonardo en Argentina.", altEn: "Leonardo's weigh-in in Argentina.", celda: "pesaje", ratio: ratioDe(pesajeArg) },
      { imagen: pesajeArgentina, alt: "Careo previo a un combate en Argentina.", altEn: "Pre-fight faceoff in Argentina.", celda: "pesaje", ratio: ratioDe(pesajeArgentina) },
      { imagen: pesajeArgentina2, alt: "Leonardo posando en el pesaje.", altEn: "Leonardo posing at the weigh-in.", celda: "pesaje", ratio: ratioDe(pesajeArgentina2) },
      {
        imagen: fighter,
        alt: "Leonardo en guardia, en el predio.",
        altEn: "Leonardo in fighting stance, at the venue.",
        celda: "fighter",
        posicion: "center 38%",
        ratio: ratioDe(fighter),
      },
      { imagen: aPunto, alt: "Leonardo preparándose para entrar al evento.", altEn: "Leonardo getting ready to enter the event.", celda: "momento", ratio: ratioDe(aPunto) },
      { imagen: enCasa, alt: "Leonardo entrenando en casa con el saco.", altEn: "Leonardo training at home with a heavy bag.", celda: "momento", ratio: ratioDe(enCasa) },
      { imagen: enCasa2, alt: "Leonardo vendándose las manos en casa.", altEn: "Leonardo wrapping his hands at home.", celda: "momento", ratio: ratioDe(enCasa2) },
      { imagen: win, alt: "Leonardo celebrando una victoria.", altEn: "Leonardo celebrating a win.", celda: "momento", ratio: ratioDe(win) },
      { imagen: reccia, alt: "Leonardo junto a Francisco Reccia después del combate.", altEn: "Leonardo with Francisco Reccia after the fight.", celda: "momento", ratio: ratioDe(reccia) },
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
      {
        imagen: cantandoBalcon,
        alt: "Leonardo cantando junto a sus compañeros, bajo luces violetas.",
        altEn: "Leonardo singing with his bandmates under violet lights.",
        celda: "balcon",
        posicion: "center 48%",
        ratio: ratioDe(cantandoBalcon),
      },
    ],
  },
  familia: {
    pie: "Una historia familiar, desde los primeros años hasta hoy.",
    pieEn: "A family story, from the early years to today.",
    celdas: [
      {
        imagen: bebeMamaNueva,
        alt: "Leonardo bebé en brazos de su mamá.",
        altEn: "Baby Leonardo in his mother's arms.",
        celda: "bebe",
        posicion: "center center",
        ratio: ratioDe(bebeMamaNueva),
      },
      {
        imagen: gabiPequenosJardin,
        alt: "Leonardo y Gabriela de pequeños en el jardín.",
        altEn: "Leonardo and Gabriela as children in the garden.",
        celda: "jardin",
        ratio: ratioDe(gabiPequenosJardin),
      },
      {
        imagen: gabiPequenosTres,
        alt: "Leonardo y Gabriela sentados juntos, de pequeños.",
        altEn: "Leonardo and Gabriela sitting together as children.",
        celda: "tres",
        ratio: ratioDe(gabiPequenosTres),
      },
      {
        imagen: gabiPequenosMoto,
        alt: "Leonardo y Gabriela en una moto, de niños.",
        altEn: "Leonardo and Gabriela on a motorcycle as children.",
        celda: "moto",
        ratio: ratioDe(gabiPequenosMoto),
      },
      {
        imagen: miFamilia,
        alt: "Leonardo y Gabriela en la escalera, bajo las flores.",
        altEn: "Leonardo and Gabriela on the ladder, under the flowers.",
        celda: "escalera",
        ratio: ratioDe(miFamilia),
      },
      {
        imagen: gabiPequenosDos,
        alt: "Leonardo y Gabriela en la playa.",
        altEn: "Leonardo and Gabriela at the beach.",
        celda: "playa",
        ratio: ratioDe(gabiPequenosDos),
      },
      {
        imagen: familiaDos,
        alt: "Leonardo con sus padres y su hermana.",
        altEn: "Leonardo with his parents and sister.",
        celda: "familia-dos",
        ratio: ratioDe(familiaDos),
      },
      {
        imagen: mamaGabiFiesta,
        alt: "Leonardo, su mamá y Gabriela en una fiesta.",
        altEn: "Leonardo, his mother and Gabriela at a party.",
        celda: "fiesta",
        ratio: ratioDe(mamaGabiFiesta),
      },
      {
        imagen: papaCaballo,
        alt: "Leonardo junto a su papá a caballo.",
        altEn: "Leonardo beside his father on horseback.",
        celda: "caballo",
        ratio: ratioDe(papaCaballo),
      },
      {
        imagen: familiaAguaNueva,
        alt: "La familia reunida en el agua.",
        altEn: "The family together in the water.",
        celda: "agua",
        ratio: ratioDe(familiaAguaNueva),
      },
      {
        imagen: familiaPrincipalNueva,
        alt: "Nené, Leonardo, César, Lidia y Gabriela juntos.",
        altEn: "Nené, Leonardo, César, Lidia and Gabriela together.",
        celda: "principal",
        fit: "contain",
        ratio: ratioDe(familiaPrincipalNueva),
      },
      {
        imagen: familiaActual6475,
        alt: "Una comida familiar con mamá y un niño.",
        altEn: "A family meal with mom and a child.",
        celda: "actual-comida",
        ratio: ratioDe(familiaActual6475),
      },
      {
        imagen: familiaActual5218,
        alt: "La familia reunida en el living.",
        altEn: "The family gathered in the living room.",
        celda: "actual-living",
        ratio: ratioDe(familiaActual5218),
      },
      {
        imagen: familiaActual6490,
        alt: "Una noche familiar en casa.",
        altEn: "A family night at home.",
        celda: "actual-noche",
        ratio: ratioDe(familiaActual6490),
      },
      {
        imagen: familiaActual5006,
        alt: "Leonardo caminando con un niño entre flores.",
        altEn: "Leonardo walking with a child among flowers.",
        celda: "actual-paseo",
        ratio: ratioDe(familiaActual5006),
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
