import React from "react";

const MainInfo = ({ product }) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <div className="text-gray-600 mb-4">SKU: {product.sku}</div>
      <div
        className={`text-gray-600 mb-4 ${
          product.stock_status == "IN_STOCK" ? "text-green-600" : "text-red-600"
        }`}
      >
        Stock: {product.stock_status}
      </div>
      <div className="text-2xl font-bold mb-4">
        {product.price_range.maximum_price.final_price.currency}
        {product.price_range.maximum_price.final_price.value}
      </div>
      <div
        className="text-gray-600 mb-4 mt-4"
        dangerouslySetInnerHTML={{ __html: product.short_description.html }}
      ></div>
      <div
        className="text-gray-600 mb-4 mt-4"
        dangerouslySetInnerHTML={{ __html: product.description.html }}
      />
    </>
  );
};

export default MainInfo;
