import type { ImageMetadata } from "astro";
import cibeles from "../assets/recomendaciones/cibeles-smith.png";
import daniel from "../assets/recomendaciones/daniel-toledo.png";
import gabriel from "../assets/recomendaciones/gabriel-arce.png";
import german from "../assets/recomendaciones/german-moren.png";
import juan from "../assets/recomendaciones/juan-uberti.png";
import sebastian from "../assets/recomendaciones/sebastian-correa.png";

export type Recomendacion = {
  slug: string;
  nombre: string;
  rol: string;
  fecha: string;
  relacion: string;
  relacionEn: string;
  texto: string;
  perfil: string;
  foto: ImageMetadata;
};

/** Textos y perfiles tomados de las recomendaciones públicas de LinkedIn. */
export const recomendaciones: Recomendacion[] = [
  {
    slug: "daniel-toledo",
    nombre: "Daniel Toledo",
    rol: "Software Engineer | Fullstack Developer | Node | TypeScript | React | PHP | Next.Js",
    fecha: "29 de octubre de 2026",
    relacion: "Daniel trabajó con Leonardo en el mismo equipo",
    relacionEn: "Daniel worked with Leonardo on the same team",
    texto:
      "Tuve la oportunidad de conocer de cerca su forma de trabajar y puedo decir con total confianza que es una persona sumamente profesional, comprometida y dedicada a lo que hace.\n\nUna de las cualidades que más destaco de él es que no se limita simplemente a cumplir con sus responsabilidades, sino que siempre busca aportar algo más. Se involucra mucho en cada proyecto, asume los desafíos con mucho carácter y pone todo de sí para lograr los mejores resultados.\n\nAdemás, tiene una gran capacidad creativa y una visión que lo impulsa constantemente a pensar en grande, proponer nuevas ideas y buscar oportunidades de mejora. Lo que realmente lo distingue es que acompaña esa visión con esfuerzo, responsabilidad y una enorme voluntad de hacer que las cosas sucedan.\n\nSin dudas, es de esas personas que marcan una diferencia en los equipos de los que forman parte, tanto por sus capacidades profesionales como por su actitud y compromiso. Un profesional al que recomiendo con total confianza.\n\nUn gran profesional y amigo que me dejó esta profesión.",
    perfil: "https://www.linkedin.com/in/daniel-toledo-25b27b1b7/",
    foto: daniel,
  },
  {
    slug: "german-moren",
    nombre: "German Moren",
    rol: "Sr. Software Developer | Node.js · TypeScript · AWS | Serverless · NestJS · React",
    fecha: "27 de octubre de 2026",
    relacion: "German trabajó con Leonardo en el mismo equipo",
    relacionEn: "German worked with Leonardo on the same team",
    texto:
      "Trabajé con Leo en Tiendamia y lo vi crecer un montón. Arrancó como QA, después pasó a liderar el equipo de QA y más tarde se metió de lleno en automatización. Cada paso lo hizo porque quiso aprender más y no se quedó cómodo en ningún rol.\n\nLo que más valoro de él es que siempre está queriendo mejorar. Pregunta, prueba cosas, se mete a fondo en los problemas hasta entenderlos y cuando algo se puede hacer mejor, lo hace mejor. Eso se nota en la calidad de lo que entrega y en cómo trabaja con el resto del equipo.\n\nAdemás es de esas personas con las que da gusto laburar: buena onda, responsable y con ganas de ayudar. Cualquier equipo que lo tenga está en buenas manos.",
    perfil: "https://www.linkedin.com/in/germanmoren/",
    foto: german,
  },
  {
    slug: "gabriel-arce",
    nombre: "Gabriel Arce",
    rol: "Sr Fullstack Developer",
    fecha: "19 de octubre de 2026",
    relacion: "Gabriel dio clase a Leonardo",
    relacionEn: "Gabriel taught Leonardo",
    texto:
      "Tuve la oportunidad de compartir dos etapas diferentes con Leonardo, primero como compañero de trabajo y referente en IBM, y unos años después como su docente de Programación 1 en ORT.\n\nDurante nuestra etapa en IBM trabajamos en proyectos desafiantes dentro de la industria bancaria, donde pude apreciar su compromiso, responsabilidad y, sobre todo, sus ganas de aprender y superarse constantemente.\n\nAños después, desde mi rol como docente, pude confirmar esas mismas cualidades desde otra perspectiva. Leo demostró ser un alumno dedicado, detallista y curioso, siempre interesado en comprender, profundizar sus conocimientos y seguir creciendo.\n\nEs muy gratificante haber compartido ambas experiencias y haber sido testigo de su compromiso con el aprendizaje y su desarrollo profesional.",
    perfil: "https://www.linkedin.com/in/gabriel-arce-profile/",
    foto: gabriel,
  },
  {
    slug: "sebastian-correa",
    nombre: "Sebastian Correa",
    rol: "Quality Assurance Manager",
    fecha: "24 de septiembre de 2024",
    relacion: "Sebastian supervisaba directamente a Leonardo",
    relacionEn: "Sebastian directly managed Leonardo",
    texto:
      "As a Manager at Tiendamia, I have had the pleasure of working with Leonardo Pedreira, who has proven to be an indispensable part of the Quality Assurance (QA) team and has performed his role as Software Tester Lead with extraordinary excellence.\n\nFrom the very start of his tenure, Leonardo has stood out for his exceptional technical skills and outstanding leadership abilities. He has expertly guided the QA team, leading them through the complexities of projects with strategic clarity and a rigorous focus on technical details. His expertise in test automation, defect management, and relentless drive for process improvement has led to a significant reduction in production defects, thereby enhancing the software delivery with every sprint.\n\nBeyond his technical prowess, Leonardo excels in interpersonal skills and collaborative leadership. He has fostered a highly productive team environment where members feel motivated and well-supported in their responsibilities. His ability to manage expectations across teams and departments has been crucial in maintaining excellent cross-functional communication, ensuring that quality requirements are consistently met at the highest standards.\n\nOne of the key strengths that I must highlight is his proactivity in tackling challenges and anticipating issues before they arise. His forward-thinking approach has led to significant improvements in the software development lifecycle, ensuring high-quality end products with minimal issues.\n\nIn summary, Leonardo is an incredibly competent leader with a strong strategic vision, outstanding technical abilities, and a collaborative attitude that enables any team under his leadership to thrive. I am confident that he will continue to be an invaluable asset to any project or company fortunate enough to have him.",
    perfil: "https://www.linkedin.com/in/sebastian-correa-a20291b2/",
    foto: sebastian,
  },
  {
    slug: "juan-uberti",
    nombre: "Juan Uberti",
    rol: "Engineering Manager - Verify & Consumer Bureau",
    fecha: "18 de agosto de 2024",
    relacion: "Juan trabajó con Leonardo pero en equipos distintos",
    relacionEn: "Juan worked with Leonardo but on different teams",
    texto:
      "I had the pleasure of working with Leonardo at Tiendamia for a handful of years -- and even in his early days, as he joined our growing QA team with bright eyes, I had a great feeling he would (and oh he so did) go far!\n\nLeo embodied our core principles from the first day in an exemplary fashion; from his laser customer-centric focus in quality checks, his detailed and constructive internal -and external- communication, his instrumental and key collaboration in key incident resolution, his drive for constant learning and growth and his general joy in what he did. Leo was a joy to work with and was highly regarded and respected among his peers within and without Engineering.\n\nLeo always strove for greatness, whether via learning opportunities using Tiendamia's training (including attending some of the advanced SQL and Tableau workshops my team led to name a few) or through his own initiatives which he often shared internally in our chats to help others.\n\nI happily, and very strongly, recommend Leo without reservation for any team who wishes to bring on a QA engineer (at least that's how I've known him but I wouldn't doubt he has surpassed my expectations yet again) with the drive and joy in his work that ensure his only limit is how well you can help him grow alongside you!",
    perfil: "https://www.linkedin.com/in/juan-uberti/",
    foto: juan,
  },
  {
    slug: "cibeles-smith",
    nombre: "Ing. Cibeles Smith",
    rol: "Industrial Engineer | AI Evaluations | Product Quality | Team Lead",
    fecha: "28 de junio de 2024",
    relacion: "Ing. Cibeles trabajó con Leonardo en el mismo equipo",
    relacionEn: "Ing. Cibeles worked with Leonardo on the same team",
    texto:
      "Tuve el privilegio de trabajar codo a codo con Leonardo durante más de dos años, y puedo decir con confianza que es un profesional excepcional. Su capacidad de análisis detallado combinado con astucia le permite abordar problemas complejos con claridad y precisión. Además, Leonardo destaca por su excelente trato y su habilidad para relacionarse con sus compañeros, creando un ambiente de trabajo colaborativo y positivo. Su resiliencia a la hora de encontrar soluciones es admirable, siempre persevera hasta hallar la mejor opción posible en un entorno de agilidad.\n\nOtra de sus grandes fortalezas es su capacidad de investigación y desarrollo, siempre buscando innovar y mejorar continuamente. Como líder, es inspirador y movilizador, con una energía que motiva a todo el equipo a alcanzar sus objetivos.\n\nSería un activo valioso para cualquier equipo.",
    perfil: "https://www.linkedin.com/in/ing-cibeles-smith-a2154146/",
    foto: cibeles,
  },
];

export const recomendacionesUrl =
  "https://www.linkedin.com/in/leonardo-pedreira/details/recommendations/";
