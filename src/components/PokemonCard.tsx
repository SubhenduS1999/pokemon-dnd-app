import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

type Props = {
  name: string;
};

export default function PokemonCard({ name }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        width: "200px",
        textAlign: "center",
        margin: "10px",
      }}
    >
      <h3 style={{ textTransform: "capitalize" }}>{name}</h3>

      <FavoriteButton name={name} />

      <br />

      <Link to={`/pokemon/${name}`}>View Details</Link>
    </div>
  );
}