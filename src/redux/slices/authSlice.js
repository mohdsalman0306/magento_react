import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../utils/apolloClient";
import { LOGIN_MUTATION } from "../../utils/graphql/mutation";

// GraphQL Mutation

const initialState = {
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login', // Add descriptive action type
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email: credentials.username,
          password: credentials.password,
        },
      });
      if (!data?.generateCustomerToken?.token) {
        throw new Error('Invalid response from server');
      }
      localStorage.setItem("token", data.generateCustomerToken.token);
      return data.generateCustomerToken.token;
    } catch (error) {
      const message = error.graphQLErrors?.[0]?.message || error.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

const isTokenExpired = (token) => {
  try {
    if (!token) return true;
    const payload = token.split('.')[1];
    if (!payload) return true;
    const decoded = JSON.parse(atob(payload));
    return !decoded.exp || decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.log(error.message)
    return true; // If token is invalid format, consider it expired
  }
};

if (isTokenExpired(initialState.token)) {
  localStorage.removeItem("token"); // Clear expired token
  initialState.token = null;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      (state.token = null), localStorage.removeItem("token");
      localStorage.removeItem("cartData");
      localStorage.removeItem("items");
      localStorage.removeItem("total_quantity");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
