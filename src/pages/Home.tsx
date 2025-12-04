// src/pages/Home.tsx
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";
import SkeletonBox from "../components/SkeletonBox";

export default function Home() {
  const [pokemon, setPokemon] = useState<{ name: string }[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      try {
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        if (!res.ok) throw new Error("Failed to fetch Pokémon");

        const data = await res.json();
        setPokemon(data.results);
      } catch {
        console.error("Failed to load Pokémon");
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  const filtered = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ paddingTop: "180px" }}>
      {/* FIXED TITLE */}
      <h2
        style={{
          position: "fixed",
          top: "110px",
          left: 0,
          width: "100%",
          background: "white",
          padding: "10px 20px",
          zIndex: 998,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        Pokemon List
      </h2>

      {/* FIXED SEARCHBAR */}
      <div
        style={{
          position: "fixed",
          top: "50px",
          left: 0,
          width: "100%",
          background: "white",
          padding: "15px 20px",
          zIndex: 999,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* LIST */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {loading
          ? Array.from({ length: 30 }).map((_, i) => (
              <div key={i} style={{ width: "150px", padding: "10px" }}>
                <SkeletonBox width="100%" height="140px" />
                <SkeletonBox width="80%" height="20px" />
              </div>
            ))
          : filtered.map((p) => (
              <PokemonCard key={p.name} name={p.name} />
            ))}
      </div>
    </div>
  );
}