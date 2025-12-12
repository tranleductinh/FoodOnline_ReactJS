import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SignInPage from "./pages/AuthPages/SignInPage";
import FoodManagementPage from "./pages/AdminPages/FoodManagementPage";
import OrderManagementPage from "./pages/AdminPages/OrderManagementPage";
import MenuPage from "./pages/UsersPages/MenuPage";
import OrderPage from "./pages/UsersPages/OrderPage";
import CartPage from "./pages/UsersPages/CartPage";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./contexts/authContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" index element={<SignInPage />} />
            <Route element={<Layout />}>
              <Route
                path="/menu"
                element={
                  <ProtectedRoute role={"user"}>
                    <MenuPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role={"admin"}>
                    <FoodManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute role={"admin"}>
                    <OrderManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute role={"user"}>
                    <OrderPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute role={"user"}>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
