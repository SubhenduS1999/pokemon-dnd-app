export default function SkeletonBox({ width = "100%", height = "20px" }) {
  return (
    <div
      style={{
        width,
        height,
        background: "#e2e2e2",
        borderRadius: 6,
        animation: "pulse 1.5s infinite",
      }}
    />
  );
}