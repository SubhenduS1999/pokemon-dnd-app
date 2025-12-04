export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`bg-gray-300 rounded animate-pulse ${className}`}
    ></div>
  );
}