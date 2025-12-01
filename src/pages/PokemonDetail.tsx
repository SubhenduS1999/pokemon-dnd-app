import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentBox from "../components/CommentBox";

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [comments, setComments] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem(`comments-${name}`) || "[]");
  });

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then(setPokemon);
  }, [name]);

  const addComment = (msg: string) => {
    const updated = [...comments, msg];
    setComments(updated);
    localStorage.setItem(`comments-${name}`, JSON.stringify(updated));
  };

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{pokemon.name}</h2>

      <img src={pokemon.sprites.front_default} />

      <h3>Types</h3>
      <ul>
        {pokemon.types.map((t: any) => (
          <li key={t.type.name}>{t.type.name}</li>
        ))}
      </ul>

      <h3>Comments</h3>
      <CommentBox onSubmit={addComment} />

      <ul>
        {comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}