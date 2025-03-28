import { useState } from "react";

const Color = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState('red');
  return (
    <div className="mb-6">
      <div className="font-medium mb-2">Color:</div>
      <div className="flex space-x-2">
        {product.colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === color ? "border-blue-500" : "border-gray-200"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default Color;
