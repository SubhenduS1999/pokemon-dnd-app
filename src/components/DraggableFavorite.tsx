import { useDrag } from "react-dnd";
import { ITEM_TYPE } from "./DraggablePokemon";

type Props = {
  name: string;
};

export default function DraggableFavorite({ name }: Props) {
  const [, dragRef] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { name, fromFavorites: true },
  }));

  return (
    <li
      ref={(node) => {
        if (node) dragRef(node);
      }}
      style={{
        cursor: "grab",
        padding: "4px 0",
        textTransform: "capitalize",
      }}
    >
      {name}
    </li>
  );
}
