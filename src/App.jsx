import { Route, BrowserRouter as Router, Routes } from "react-router";
import { useSelector } from "react-redux";
import List from "./Pages/Category/List";
import Header from "./components/Header";
import Megamenu from "./Pages/Navbar/MegaMenu";
import Footer from "./components/Footer";
import ProductPage from "./Pages/Product/ProductPage";
import Home from "./Pages/Home/Home";
import Login from "./Pages/User/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./Pages/User/Dashboard";
import Cart from "./Pages/Checkout/Cart";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";

function App() {
  const { token } = useSelector((state) => state.auth);
  return (
    <Router>
      <Header />
      <Megamenu parentId={"2"} pageSize={20} currentPage={1} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/category/:categoryName/*" element={<List />} />
        <Route path="/product/:productName/*" element={<ProductPage />} />
        <Route path="/checkout/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="customer/account/login"
          element={!token ? <Login /> : <Dashboard />}
        />
        <Route
          path="customer/account"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
