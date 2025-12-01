// DraggablePokemon.tsx
import type { FC, Ref } from "react";
import { useDrag } from "react-dnd";

type Props = {
  name: string;
  sprite?: string | null;
};

export const ITEM_TYPE = "POKEMON";

const DraggablePokemon: FC<Props> = ({ name, sprite }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: ITEM_TYPE,
      item: { name },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [name]
  );

  return (
    <div
      ref={dragRef as unknown as Ref<HTMLDivElement>}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
        width: 160,
        textAlign: "center",
        background: "white",
      }}
    >
      {sprite && (
        <img src={sprite} alt={name} style={{ width: 64, height: 64 }} />
      )}
      <div style={{ textTransform: "capitalize", marginTop: 8 }}>
        {name}
      </div>
    </div>
  );
};

export default DraggablePokemon;
