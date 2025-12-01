import type { FC } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar: FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokemon..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "10px",
        width: "100%",
        marginBottom: "20px",
        borderRadius: "6px",
        border: "1px solid #ccc",
      }}
    />
  );
};

export default SearchBar;