import React from "react";
import { Link } from "react-router";

const RelatedProduct = ({ product }) => {
  return (
    <>
      {product.related_products.length > 0 ? (
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.related_products.map((product) => (
              <div
                key={product.sku}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link
                  to={`/product/${product.url_key
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  state={{ type: product?.__typename, sku: product?.sku }}
                >
                  
                  <img
                    src={product.thumbnail.url}
                    className="w-full h-48 object-cover"
                  />
                </Link>

                <div className="p-4">
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <div className="text-lg font-bold">
                    {product.price_range.maximum_price.final_price.currency}
                    {product.price_range.maximum_price.final_price.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default RelatedProduct;
