// AllPokemons.tsx
import { useEffect, useState } from "react";
import DraggablePokemon from "../components/DraggablePokemon";
import FavoritesDropZone from "../components/FavoritesDropZone";
import RemoveFavoriteDropZone from "../components/RemoveFavoriteDropZone";
import { Link } from "react-router-dom";

type PokemonListItem = { name: string; url: string };
type PokemonPageItem = { name: string; sprite?: string | null };

const PAGE_SIZE = 20;

export default function AllPokemons() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<PokemonPageItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadPage() {
      setLoading(true);
      const offset = (page - 1) * PAGE_SIZE;
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
      );
      const data = await res.json();
      if (cancelled) return;
      setTotal(data.count || 0);

      // fetch sprites for each item (small requests)
      const detailed = await Promise.all(
        data.results.map(async (r: PokemonListItem) => {
          try {
            const d = await fetch(r.url).then((s) => s.json());
            return { name: r.name, sprite: d.sprites.front_default || null };
          } catch {
            return { name: r.name, sprite: null };
          }
        })
      );

      if (cancelled) return;
      setItems(detailed);
      setLoading(false);
    }

    loadPage();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div style={{ padding: 20 }}>
      <h2>All Pokemons</h2>

      <div style={{ display: "flex", gap: 16 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Prev
        </button>
        <div style={{ alignSelf: "center" }}>
          Page {page} / {totalPages || "…"}
        </div>
        <button onClick={() => setPage((p) => Math.min(totalPages || p + 1, p + 1))} disabled={page === totalPages}>
          Next
        </button>
        <div style={{ marginLeft: "auto" }}>
          <Link to="/">Back Home</Link>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: 12 }}>
            {items.map((it) => (
              <DraggablePokemon key={it.name} name={it.name} sprite={it.sprite} />
            ))}
          </div>
        )}
      </div>

      <FavoritesDropZone />
      <RemoveFavoriteDropZone />
    </div>
  );
}