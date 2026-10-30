import { getCollection, type CollectionEntry } from "astro:content";

export type Lugar = CollectionEntry<"lugares">;

export async function lugaresPublicados(): Promise<Lugar[]> {
  const todos = await getCollection("lugares");
  return todos.sort((a, b) => a.data.orden - b.data.orden);
}
