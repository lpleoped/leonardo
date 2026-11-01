import { defineCollection, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const disciplinas = z.enum([
  "campaña",
  "motion",
  "ilustración",
  "diseño editorial",
  "diseño",
]);

function medio({ image }: SchemaContext) {
  return z
    .object({
      alt: z.string().min(1),
      ancho: z.number().int().positive(),
      alto: z.number().int().positive(),
      imagen: image().optional(),
      video: z.string().min(1).optional(),
      poster: image().optional(),
    })
    .superRefine((value, ctx) => {
      if (value.video && !value.poster) {
        ctx.addIssue({
          code: "custom",
          message: "El video necesita poster.",
          path: ["poster"],
        });
      }
    });
}

const casos = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/casos",
    generateId: ({ entry, data }) =>
      typeof data.slug === "string" && data.slug.length > 0
        ? data.slug
        : entry.replace(/\.(md|mdx)$/i, ""),
  }),
  schema: (context) =>
    z.object({
      titulo: z.string().min(1),
      slug: z.string().min(1),
      frase: z.string().min(1).optional(),
      cliente: z.string().min(1).optional(),
      anio: z.number().int(),
      rol: z.string().min(1),
      colaboradores: z.array(z.string().min(1)).default([]),
      disciplinas: z.array(disciplinas).min(1),
      desafio: z.string().min(1),
      premios: z
        .array(
          z.object({
            nombre: z.string().min(1),
            anio: z.number().int(),
          }),
        )
        .default([]),
      pieza: medio(context),
      apoyos: z.array(medio(context)).max(4).default([]),
      destacado: z.boolean(),
      orden: z.number().int(),
      colorDeCaso: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      enlace: z.string().url().optional(),
      og: z
        .object({
          titulo: z.string().min(1),
          descripcion: z.string().min(1),
          imagen: context.image(),
        })
        .optional(),
    }),
});

const lugares = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/lugares",
    generateId: ({ entry, data }) =>
      typeof data.slug === "string" && data.slug.length > 0
        ? data.slug
        : entry.replace(/\.(md|mdx)$/i, ""),
  }),
  schema: z.object({
    slug: z.string().min(1),
    orden: z.number().int(),
    cuando: z.string().min(1),
    cuandoEn: z.string().min(1),
    lugar: z.string().min(1),
    lugarEn: z.string().min(1),
    detalle: z.string().min(1).optional(),
    detalleEn: z.string().min(1).optional(),
    bajada: z.string().min(1).optional(),
    bajadaEn: z.string().min(1).optional(),
    nota: z.string().min(1).optional(),
    notaEn: z.string().min(1).optional(),
    enlace: z.string().url().optional(),
    enlaceEtiqueta: z.string().min(1).optional(),
    enlaceEtiquetaEn: z.string().min(1).optional(),
    hitos: z
      .array(
        z.object({
          cuando: z.string().min(1).optional(),
          cuandoEn: z.string().min(1).optional(),
          rol: z.string().min(1),
          rolEn: z.string().min(1),
        }),
      )
      .default([]),
    escenas: z
      .array(
        z.object({
          id: z.string().min(1),
          titulo: z.string().min(1),
          tituloEn: z.string().min(1),
          texto: z.string().min(1),
          textoEn: z.string().min(1),
        }),
      )
      .default([]),
  })
  .refine(
    (lugar) =>
      !lugar.enlace ||
      (Boolean(lugar.enlaceEtiqueta) && Boolean(lugar.enlaceEtiquetaEn)),
    { message: "Un enlace de lugar pide etiqueta en ES y EN." },
  ),
});

const facetas = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/facetas",
    generateId: ({ entry, data }) =>
      typeof data.slug === "string" && data.slug.length > 0
        ? data.slug
        : entry.replace(/\.(md|mdx)$/i, ""),
  }),
  schema: (context) =>
    z.object({
      slug: z.string().min(1),
      orden: z.number().int(),
      titulo: z.string().min(1),
      tituloEn: z.string().min(1),
      detalle: z.string().min(1),
      detalleEn: z.string().min(1),
      cara: context.image(),
      caraAlt: z.string().min(1),
      caraAltEn: z.string().min(1),
      personas: z
        .array(
          z.object({
            nombre: z.string().min(1),
            nota: z.string().min(1),
            notaEn: z.string().min(1),
            enlace: z.string().url().optional(),
            enlaceEtiqueta: z.string().min(1).optional(),
            enlaceEtiquetaEn: z.string().min(1).optional(),
          }),
        )
        .default([]),
      videos: z
        .array(
          z.object({
            titulo: z.string().min(1),
            nota: z.string().min(1),
            notaEn: z.string().min(1),
            url: z.string().url(),
            poster: context.image(),
            posterAlt: z.string().min(1),
            posterAltEn: z.string().min(1),
            forma: z.enum(["cine", "retrato", "sello"]).default("cine"),
          }),
        )
        .default([]),
      escenas: z
        .array(
          z.object({
            id: z.string().min(1),
            titulo: z.string().min(1),
            tituloEn: z.string().min(1),
            texto: z.string().min(1),
            textoEn: z.string().min(1),
          }),
        )
        .min(1),
    })
    .refine(
      (faceta) =>
        faceta.personas.every(
          (persona) =>
            !persona.enlace || (Boolean(persona.enlaceEtiqueta) && Boolean(persona.enlaceEtiquetaEn)),
        ),
      { message: "Un enlace de persona pide etiqueta en ES y EN." },
    ),
});

export const collections = { casos, lugares, facetas };


