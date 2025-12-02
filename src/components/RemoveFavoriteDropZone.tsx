import { useDrop } from "react-dnd";
import { ITEM_TYPE } from "./DraggablePokemon";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export default function RemoveFavoriteDropZone() {
  const { favorites, toggleFavorite } = useContext(AppContext);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: any) => {
      if (favorites.includes(item.name)) {
        toggleFavorite(item.name); // REMOVE FAVORITE
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        if (node) dropRef(node);
      }}
      style={{
        position: "fixed",
        right: 20,
        top: 260,
        width: 240,
        minHeight: 80,
        background: isOver ? "#ffe6e6" : "#fff",
        border: "2px dashed red",
        padding: 12,
        borderRadius: 8,
        zIndex: 1100,
      }}
    >
      <h4 style={{ margin: 0, color: "red" }}>Remove Favourite</h4>
      <small>Drag here to remove</small>
    </div>
  );
}