import { useState } from "react";

type Props = {
  onSubmit: (comment: string) => void;
};

export default function CommentBox({ onSubmit }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <div>
      <textarea
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <button onClick={handleSend} style={{ marginTop: "10px" }}>
        Add Comment
      </button>
    </div>
  );
}
