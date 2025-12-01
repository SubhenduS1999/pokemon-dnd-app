import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [pokemon, setPokemon] = useState<{ name: string }[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then((res) => res.json())
      .then((data) => setPokemon(data.results));
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
          top: "110px", // header  + search bar height
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
          top: "50px", // header height
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {filtered.map((p) => (
          <PokemonCard key={p.name} name={p.name} />
        ))}
      </div>
    </div>
  );
}