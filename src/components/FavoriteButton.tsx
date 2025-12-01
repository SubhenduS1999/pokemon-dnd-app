import { useContext } from "react";
import { AppContext } from "../context/AppContext";

type Props = {
  name: string;
};

export default function FavoriteButton({ name }: Props) {
  const { favorites, toggleFavorite } = useContext(AppContext);
  const isFav = favorites.includes(name);

  return (
    <button
      onClick={() => toggleFavorite(name)}
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        background: isFav ? "red" : "gray",
        color: "white",
        border: "none",
        cursor: "pointer",
        marginBottom: "10px",
      }}
    >
      {isFav ? "❤️ Remove Favorite" : "🤍 Add Favorite"}
    </button>
  );
}