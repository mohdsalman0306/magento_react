import { Button } from "@headlessui/react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const MiniCart = ({ cartItems }) => {
  const navigate = useNavigate();
  // const totalQty = useSelector((state) => state.cart.items);
  return (
    <div className="absolute right-0 mt-4 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50">
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 py-2 border-b last:border-none"
        >
          <Link to={"#"}>
            <img
              src={item.product.thumbnail.url}
              alt={item.product.thumbnail.label}
              className="w-12 h-12 rounded"
            />
          </Link>
          <div>
            <p className="font-semibold">{`${item.product.name}`}</p>
            <p className="text-sm text-gray-500">
              Sku: {item.product.sku}{" "}
              <span className="ml-6">{`Qty: ${item.quantity}`}</span>
            </p>
            {/* <p className="text-sm text-gray-500">{item.product.price_range.maximum_price.final_price.currency}{item.product.price_range.maximum_price.final_price.value}</p> */}
          </div>
        </div>
      ))}
      <Button
        onClick={() => navigate("/checkout")}
        className="w-full mt-4 bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700"
      >
        {"Checkout"}
      </Button>
      <p className="text-center mt-2 text-blue-600 cursor-pointer text-sm">
        <Link
          className="text-center mt-2 text-blue-600 cursor-pointer text-sm"
          to={`/checkout/cart`}
        >
          {"View Shopping Bag"}
        </Link>
      </p>
    </div>
  );
};

export default MiniCart;
