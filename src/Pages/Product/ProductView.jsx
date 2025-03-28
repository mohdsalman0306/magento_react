// ProductDetailPage.jsx
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { useSelector } from "react-redux";

import MediaGallery from "../../components/Product/View/MediaGallery";
import MainInfo from "../../components/Product/View/MainInfo";
import Color from "../../components/Product/View/swatch/Color";
import Size from "../../components/Product/View/swatch/Size";
import Qty from "../../components/Product/View/Qty";
import Button from "../../components/Product/View/AddTo/Button";
import Specifications from "../../components/Product/View/Specifications";
import Review from "../../components/Product/View/Review";
import RelatedProduct from "../../components/Product/View/RelatedProduct";
import {
  GET_SIMPLE_PRODUCT,
  ADD_SIMPLE_PRODUCTS_TO_CART,
} from "../../utils/graphql/query";
import SkeletonProductPage from "./SkeletonProductPage";

const ProductView = ({ type, urlKey }) => {
  const [productType, setProductType] = useState(type);
  const { loading, err, data } = useQuery(GET_SIMPLE_PRODUCT, {
    variables: { urlKey: urlKey },
    suspense: true,
    // fetchPolicy: "network-only",
  });
  // console.log(loading)
  const token = useSelector((state) => state.auth.token);
  const cartId = useSelector((state) => state.cart.cartId);
  const guestCartId = useSelector((state) => state.cart.guestCartId);
  const finalCartId = token ? cartId : guestCartId;
  // console.log(token, cartId, guestCartId, finalCartId);
  const [
    addToCartMutation,
    { loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_SIMPLE_PRODUCTS_TO_CART);

  const items = data?.products?.items;
  // console.log(items[0], finalCartId);
  const product = {
    name: "Premium Cotton T-Shirt",
    sku: "TSHIRT-001",
    price: 29.99,
    description:
      "Soft premium cotton t-shirt with crew neck and short sleeves.",
    images: [
      "/images/tshirt1.jpg",
      "/images/tshirt2.jpg",
      "/images/tshirt3.jpg",
    ],
    colors: ["red", "blue", "black", "white"],
    sizes: ["S", "M", "L", "XL"],
    specs: {
      material: "100% Cotton",
      weight: "180 gsm",
      fit: "Regular Fit",
      care: "Machine wash cold",
    },
    reviews: [
      {
        id: 1,
        user: "John D.",
        rating: 4,
        comment: "Great quality!",
        date: "2023-08-15",
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 5,
        comment: "Love the fit!",
        date: "2023-08-14",
      },
    ],
    relatedProducts: [
      {
        id: 2,
        name: "V-Neck T-Shirt",
        price: 34.99,
        image: "/images/vneck.jpg",
      },
      { id: 3, name: "Polo Shirt", price: 49.99, image: "/images/polo.jpg" },
    ],
  };

  const dispatch = useDispatch();

  const handleAddtoCart = async (e) => {
    e.preventDefault();

    if (!items || !items[0] || !finalCartId) {
      alert("Missing product or cart information");
      return;
    }
    try {
      const { data } = await addToCartMutation({
        variables: {
          cartId: finalCartId,
          sku: items[0].sku,
          quantity: 1,
        },
      });

      if (data?.addSimpleProductsToCart?.cart) {
        dispatch(addToCart(data.addSimpleProductsToCart.cart));
        // alert("Product added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // alert("Failed to add product to cart.");
    }
  };

  return loading ? (
    <SkeletonProductPage />
  ) : (
    <div className="container mx-auto px-4 py-8">
      {/* Product Gallery & Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Media Gallery */}
        <MediaGallery product={items} />

        {/* Product Main Information */}
        <div>
          <MainInfo product={items[0]} />
          {productType == "ConfigurableProduct" ? (
            <Color product={product} />
          ) : (
            <p></p>
          )}
          {productType == "ConfigurableProduct" ? (
            <Size product={product} />
          ) : (
            <p></p>
          )}
          <p>{productType}</p>
          <div className="flex items-center space-x-4 mb-6 mt-6">
            <Qty />
            <Button
              textColor={"text-white"}
              buttonTitle={addToCartLoading ? "Adding..." : "Add to Cart"}
              hoverColor={"hover:bg-blue-700"}
              px={"px-8"}
              originalColor={"bg-blue-600"}
              onClick={handleAddtoCart}
            />
            <Button
              textColor={""}
              buttonTitle={"♥ Wishlist"}
              hoverColor={"hover:bg-gray-100"}
              px={"px-4"}
              originalColor={""}
            />
            {addToCartError && (
              <p className="text-red-500">{addToCartError.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Product Specifications */}
      <Specifications product={product} />

      {/* Reviews Section */}
      <Review product={product} />

      {/* Related Products */}
      <RelatedProduct product={items[0]} />
    </div>
  );
};
export default ProductView;
