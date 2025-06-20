import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProductDetails from "../pages/ProductDetailPage";
import PostAdPage from "../pages/PostAdPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/product/details/:id" element={<ProductDetails />} />
      <Route path="/post" element={<ProtectedRoute><PostAdPage /></ProtectedRoute>} />
     
    </Routes>
  );
};

export default AppRoutes;
