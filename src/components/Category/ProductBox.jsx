import { Link } from "react-router";

const ProductBox = ({ product, loading }) => {
  if (loading)
    return (
      <>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="group relative border-spacing-2 w-48 h-64 bg-gray-200 animate-pulse rounded"
          ></div>
        ))}
      </>
    );
  return (
    <div
      key={product.uid}
      className="group relative border-spacing-2 border-gray-400">
      <img
        src={product.image.url}
        alt={product.image.label}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link
              to={`/product/${product.url_key
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              state={{ type: product?.__typename }}
            >
              <span aria-hidden="true" className="absolute inset-0" />
              {product?.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{`SKU: ${product?.sku}`}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {`${
            product?.price_range?.maximum_price?.final_price?.currency +
            product?.price_range?.maximum_price?.final_price?.value
          }`}
        </p>
      </div>
    </div>
  );
};

export default ProductBox;
