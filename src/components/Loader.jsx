import { useSelector } from "react-redux";

export default function Loader() {
  const loading = useSelector((state) => state.cart.loading); // Get loading state from Redux

  if (!loading) return null; // Don't render if loading is false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
