import { useState } from "react";

const Size = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  return (
    <div className="mb-6">
      <div className="font-medium mb-2">Size:</div>
      <div className="flex space-x-2">
        {product.sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-4 py-2 border-2 rounded ${
              selectedSize === size
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Size;
