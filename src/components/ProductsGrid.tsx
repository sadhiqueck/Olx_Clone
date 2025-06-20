import ProductCard from "./ProductCard";
import { getAllProducts } from "../services/FirebaseServices";
import React, { useEffect, useState } from "react";
import { ProductIF } from "../types/product";

const ProductsGrid: React.FC = () => {

  const [items, setItems] = useState<ProductIF[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      console.log(products);
      setItems(products);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
      <h1 style={{ color: "#002f34" }} className="text-2xl">
        Fresh recommendations
      </h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
