// FavoritesDropZone.tsx
import { useDrop } from "react-dnd";
import { ITEM_TYPE } from "./DraggablePokemon";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import DraggableFavorite from "./DraggableFavorite";


export default function FavoritesDropZone() {
  const { favorites, toggleFavorite } = useContext(AppContext);

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: any) => {
      if (!favorites.includes(item.name)) toggleFavorite(item.name);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={(node) => {
        if (node) dropRef(node);
      }}
      style={{
        position: "fixed",
        right: 20,
        top: 100,
        width: 240,
        minHeight: 120,
        background: isOver ? "#fffae6" : canDrop ? "#f0f0f0" : "#fff",
        border: "2px dashed #ddd",
        padding: 12,
        borderRadius: 8,
        zIndex: 1100,
      }}
    >
      <h4 style={{ margin: "0 0 8px 0" }}>Favourites (drop here)</h4>

      {favorites.length === 0 ? (
        <div style={{ color: "#666" }}>No favourites yet</div>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {favorites.map((f) => (
            <DraggableFavorite key={f} name={f} />
          ))}
        </ul>
      )}
    </div>
  );
}