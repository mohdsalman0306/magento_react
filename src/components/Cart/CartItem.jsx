const CartItem = ({
  image,
  title,
  sku,
  price,
  currency,
  variant,
  inStock,
  shipping,
  onRemove,
}) => {
  return (
    <>
      <div className="py-2 flex">
        <div className="m-4">
          <img
            src={image}
            className="w-28 h-30 object-cover border-gray-100 border rounded"
          />
        </div>
        <div className="m-4">
          {title && <h2 className="font-semibold text-lg">{title}</h2>}
          <div className="flex-row justify-between items-start w-96">
            <div>
              <p className="text-gray-500 text-sm">{`SKU: ${sku}`}</p>
              <p className="text-gray-600">{variant}</p>
              {inStock && (
                <div className="flex items-center mt-2 text-green-600">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">In stock</span>
                </div>
              )}
              {shipping && (
                <p className="text-sm text-gray-500 mt-1">{shipping}</p>
              )}
            </div>
            <p className="font-medium">
              <span className="text-sm">{currency}</span> {price.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="m-4">
          <div className="flex-row justify-between items-start w-44">
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-gray-600 transition-colors mt-14 ml-28"
              aria-label="Remove item"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="my-2 border-t"></div>
    </>
  );
};

export default CartItem;
