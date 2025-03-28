import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmptyGuestCart,
  createEmptyCustomerCart,
  mergeCart,
  //   // assignCustomerToGuestCart,
} from "../redux/slices/cartSlice";

export default function Footer() {
  const dispatch = useDispatch();
  const cartId = useSelector((state) => state.cart.cartId);
  const guestCartId = useSelector((state) => state.cart.guestCartId);
  const customerToken = useSelector((state) => state.auth.token);
  console.log(customerToken, cartId, guestCartId);
  useEffect(() => {
    if (!(customerToken || guestCartId)) {
      console.log("kuch bhi nahi hai");
      dispatch(createEmptyGuestCart());
    }
  }, [customerToken, guestCartId, dispatch]);

  useEffect(() => {
    if (customerToken && !cartId) {
      console.log("customer token hai, but cart nahi hai");
      dispatch(createEmptyCustomerCart());
    }

    if (customerToken && cartId && guestCartId) {
      console.log("dono cart ids hai");
      dispatch(mergeCart({ cartId, guestCartId }));
    }
  }, [customerToken, cartId, guestCartId, dispatch]);

  // console.log(cartId, customerToken)
  // useEffect(() => {
  //   if (customerToken && !cartId) {
  //     dispatch(createEmptyCustomerCart());
  //   } else if (!customerToken && !cartId && !guestCartId) {
  //     dispatch(createEmptyGuestCart());
  //   }
  //   // if (!cartId) {
  //   //   dispatch(createEmptyGuestCart());
  //   // }
  // }, [cartId, guestCartId, customerToken, dispatch]);

  // useEffect(() => {
  //   // console.log('===>')
  //   if (cartId && guestCartId && customerToken) {
  //     // console.log('888')
  //     dispatch(mergeCart({ cartId, guestCartId }));
  //   }
  // }, [cartId, guestCartId, customerToken, dispatch]);
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 SanipexGroup. All rights reserved.</p>
      </div>
    </footer>
  );
}
//eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjEsInV0eXBpZCI6MywiaWF0IjoxNzQxMDczOTI4LCJleHAiOjE3NDEwNzc1Mjh9.rL4knOM_KG8GBzB1s0z5D86x499Xr18Yy-5FEMHkVfU
//eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjEsInV0eXBpZCI6MywiaWF0IjoxNzQxMDczOTg5LCJleHAiOjE3NDEwNzc1ODl9.E4GXk5Ti3AgMjB9fdlahKWzXVcFkRjWDWeJl7fFv4Po
