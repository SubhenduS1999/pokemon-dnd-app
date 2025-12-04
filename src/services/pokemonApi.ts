// src/services/pokemonApi.ts

// ---- Memory Cache ----
const spriteCache: Record<string, string | null> = {};

// ---- LocalStorage Helpers ----
const LS_KEY = "pokemon_sprites_cache";

function loadLocalCache() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) Object.assign(spriteCache, JSON.parse(raw));
  } catch {}
}

function saveLocalCache() {
  localStorage.setItem(LS_KEY, JSON.stringify(spriteCache));
}

// Load cache on first import
loadLocalCache();

// ---- API Functions ----

// Fetch list of Pokémon (paginated)
export async function fetchPokemonList(limit: number, offset: number) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");
  return res.json();
}

// Fetch & cache the sprite for one Pokémon
export async function fetchPokemonSprite(url: string) {
  if (spriteCache[url] !== undefined) {
    return spriteCache[url];
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed");

    const data = await res.json();
    const sprite = data.sprites?.front_default || null;

    spriteCache[url] = sprite;
    saveLocalCache();

    return sprite;
  } catch {
    spriteCache[url] = null;
    return null;
  }
}