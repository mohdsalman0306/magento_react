import { useState } from "react";

const Qty = () => {
  const [quantity, setQuantity] = useState(1);
  // setAddToCartPayload({ quantity: quantity });
  return (
    <div className="flex items-center border rounded">
      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="px-4 py-2 hover:bg-gray-100"
      >
        -
      </button>
      <span className="px-4 py-2">{quantity}</span>
      <button
        onClick={() => setQuantity(quantity + 1)}
        className="px-4 py-2 hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
};

export default Qty;
