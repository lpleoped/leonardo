import { getCollection, type CollectionEntry } from "astro:content";

export type Faceta = CollectionEntry<"facetas">;

export async function facetasPublicadas(): Promise<Faceta[]> {
  const todas = await getCollection("facetas");
  return todas.sort((a, b) => a.data.orden - b.data.orden);
}

export async function facetasConFicha(): Promise<Faceta[]> {
  return facetasPublicadas();
}
