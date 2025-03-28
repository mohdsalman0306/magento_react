import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CREATE_EMPTY_GUEST_CART,
  MERGE_CARTS,
  SET_GUEST_EMAIL_ON_CART,
} from "../../utils/graphql/mutation";
import { CREATE_EMPTY_CUSTOMER_CART } from "../../utils/graphql/query";
import client from "../../utils/apolloClient";
// import { useQuery } from "@apollo/client";

export const createEmptyGuestCart = createAsyncThunk(
  "cart/createEmptyGuestCart",
  async (_, thunkAPI) => {
    if (!localStorage.getItem("guestCartId")) {
      const { data } = await client.mutate({
        mutation: CREATE_EMPTY_GUEST_CART,
        variables: {},
      });
      console.log(data);
      data.createEmptyCart
        ? localStorage.setItem("guestCartId", data.createEmptyCart)
        : null;
      return data.createEmptyCart;
    }
  }
);

export const createEmptyCustomerCart = createAsyncThunk(
  "cart/customerCart",
  async (_, { rejectWithValue }) => {
    try {
      console.log("saas", localStorage.getItem("cartId"));
      if (!localStorage.getItem("cartId")) {
        console.log("aadd");
        const { data } = await client
          .query({ query: CREATE_EMPTY_CUSTOMER_CART })
          .then((data) => data)
          .catch((err) => {
            localStorage.removeItem("cartId");
            console.log(err);
          });
        console.log(">>>>", data);
        return data.customerCart;
      }
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const mergeCart = createAsyncThunk(
  "cart/mergeCarts",
  async ({ cartId, guestCartId }, { rejectWithValue }) => {
    try {
      console.log(">>>>", cartId, guestCartId);
      if (cartId && guestCartId) {
        const { data } = await client.mutate({
          mutation: MERGE_CARTS,
          variables: { sourceCartId: guestCartId, destinationCartId: cartId },
        });
        console.log(data.mergeCarts);
        return data.mergeCarts;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const setGuestEmailOnCart = createAsyncThunk(
  "cart/setGuestEmail",
  async ({ guestCartId, emailId }, { rejectWithValue }) => {
    try {
      if (guestCartId && emailId) {
        const { data } = await client.mutate({
          mutation: SET_GUEST_EMAIL_ON_CART,
          variables: { cartId: guestCartId, email: emailId },
        });
        // console.log(data.setGuestEmailOnCart);
        return data.setGuestEmailOnCart.cart;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  loading: false,
  items: JSON.parse(localStorage.getItem("cartData"))?.items || [],
  total_quantity:
    JSON.parse(localStorage.getItem("cartData"))?.total_quantity || 0,
  cartId: localStorage.getItem("cartId") || null,
  guestCartId: localStorage.getItem("guestCartId") || null,
  cartData: JSON.parse(localStorage.getItem("cartData")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = action.payload.items
        ? action.payload.items
        : JSON.parse(localStorage.getItem("cartData")).items;
      state.total_quantity = action.payload.total_quantity;
      localStorage.setItem("cartData", JSON.stringify(action.payload));
      state.cartData = action.payload;
    },
    removeFromCart: (state, action) => {
      // state.items = state.items.filter((item) => item.id !== action.payload);
      state.items = action.payload.items
        ? action.payload.items
        : JSON.parse(localStorage.getItem("cartData")).items;
      state.total_quantity = action.payload.total_quantity;
      state.cartData = action.payload;
      localStorage.setItem("cartData", JSON.stringify(action.payload));
    },
    clearCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmptyGuestCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmptyGuestCart.fulfilled, (state, action) => {
        state.loading = false;
        state.guestCartId = action.payload;
        state.items = action.payload.items
          ? action.payload.items
          : JSON.parse(localStorage.getItem("cartData"))?.items;
      })
      .addCase(createEmptyCustomerCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmptyCustomerCart.fulfilled, (state, action) => {
        state.cartId = action.payload.id;
        state.items = action.payload.items
          ? action.payload.items
          : JSON.parse(localStorage.getItem("cartData"))?.items;
        state.cartData = action.payload;
        state.total_quantity = action.payload?.total_quantity;
        state.loading = false;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        // state.items = action.payload.items;
        state.items = action.payload.items
          ? action.payload.items
          : JSON.parse(localStorage.getItem("cartData")).items;
        state.cartId = action.payload.id;
        state.cartData = action.payload;
        state.guestCartId = null;
        state.total_quantity = action.payload.total_quantity;
        localStorage.removeItem("guestCartId");
        localStorage.setItem("cartData", JSON.stringify(action.payload));
        localStorage.setItem("items", JSON.stringify(action.payload.items));
        localStorage.setItem(
          "total_quantity",
          JSON.stringify(action.payload.total_quantity)
        );
      })
      .addCase(mergeCart.rejected, (state, action) => {
        action.payload == "";
        state.guestCartId = null;
        localStorage.removeItem("guestCartId");
      })
      .addCase(setGuestEmailOnCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(setGuestEmailOnCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items
          ? action.payload.items
          : JSON.parse(localStorage.getItem("cartData")).items;
        // state.cartId = action.payload.id;
        state.cartData = action.payload;
        // state.guestCartId = null;
        state.total_quantity = action.payload.total_quantity;
        // localStorage.removeItem("guestCartId");
        localStorage.setItem("cartData", JSON.stringify(action.payload));
        localStorage.setItem("items", JSON.stringify(action.payload.items));
        localStorage.setItem(
          "total_quantity",
          JSON.stringify(action.payload.total_quantity)
        );
      })
      .addCase(setGuestEmailOnCart.rejected, (state, action) => {
        state.loading = false;
        action.payload == "";
        // state.guestCartId = null;
        // localStorage.removeItem("guestCartId");
      });
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
