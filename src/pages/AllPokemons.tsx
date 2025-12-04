import { useEffect, useState } from "react";
import { fetchPokemonList, fetchPokemonSprite } from "../services/pokemonApi";
import DraggablePokemon from "../components/DraggablePokemon";
import FavoritesDropZone from "../components/FavoritesDropZone";
import RemoveFavoriteDropZone from "../components/RemoveFavoriteDropZone";
import Skeleton from "../components/Skeleton";
import { Link } from "react-router-dom";

const PAGE_SIZE = 20;

export default function AllPokemons() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<{ name: string; sprite: string | null }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      try {
        const offset = (page - 1) * PAGE_SIZE;
        const list = await fetchPokemonList(PAGE_SIZE, offset);

        if (cancelled) return;
        setTotal(list.count);

        const detailed = await Promise.all(
          list.results.map(async (p: any) => ({
            name: p.name,
            sprite: await fetchPokemonSprite(p.url),
          }))
        );

        if (!cancelled) setItems(detailed);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">All Pokemons</h2>
        <Link className="text-blue-600 hover:underline" to="/">
          Back Home
        </Link>
      </div>

      {/* Pagination */}
      <div className="flex gap-4 items-center">
        <button
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,200px)] gap-4">
        {loading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-[150px] h-[150px] mx-auto" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </div>
            ))
          : items.map((it) => (
              <DraggablePokemon
                key={it.name}
                name={it.name}
                sprite={it.sprite}
              />
            ))}
      </div>

      <FavoritesDropZone />
      <RemoveFavoriteDropZone />
    </div>
  );
}
