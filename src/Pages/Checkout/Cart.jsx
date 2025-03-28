import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/Cart/CartItem";
import OrderSummary from "../../components/Cart/OrderSummary";
import { useMutation } from "@apollo/client";
import { REMOVE_CART_ITEM } from "../../utils/graphql/mutation";
// import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  console.log(cartData);
  const items = cartData?.items;
  const cartPrices = cartData?.prices;
  const [
    removeCartItemMutation,
    { loading: removeCartLoading, error: removeCartError },
  ] = useMutation(REMOVE_CART_ITEM);

  removeCartLoading ? "Loading" : "";
  removeCartError ? "Error" : "";

  const handleRemoveItem = async (itemId) => {
    console.log("Removing item:", itemId, "Cart Id: ", cartData?.id);
    try {
      const { data } = await removeCartItemMutation({
        variables: {
          cartId: cartData?.id,
          cartItemUid: itemId,
        },
      });
      console.log(data.removeItemFromCart);
      return dispatch(removeFromCart(data.removeItemFromCart.cart));
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Cart Items */}
        <div className="flex-1">
          {items?.map((item) => (
            <CartItem
              key={item.uid}
              image={item.product.thumbnail.url}
              title={item.product.name}
              sku={item.product.sku}
              price={item.product.price_range.maximum_price.final_price.value}
              currency={
                item.product.price_range.maximum_price.final_price.currency
              }
              variant="Siemo - Large"
              inStock
              shipping="Ships in 3-4 weeks"
              onRemove={() => handleRemoveItem(item.uid)}
            />
          ))}
        </div>
        {/* Right Column - Order Summary */}
        <div className="md:w-96">
          <OrderSummary
            subTotal={cartPrices?.subtotal_excluding_tax}
            discounts={cartPrices?.discounts}
            shippingEstimate={""}
            appliedTax={cartPrices?.applied_taxes}
            grandTotal={cartPrices?.grand_total}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
