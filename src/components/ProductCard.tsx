import { useContext } from "react";
import { Heart } from "lucide-react";
import { ViewContext } from "../context/ViewContext";
import { useNavigate } from "react-router-dom";
import { ProductIF } from "../types/product";

const ProductCard = ({ product }: { product: ProductIF }) => {
  const viewContext = useContext(ViewContext);
  const navigate = useNavigate();
  if (!viewContext) return;
  const { setViewData } = viewContext;

  const handleCardClick = () => {
    setViewData(product);
    navigate(`product/details/${product.id}`);
  };

  const Truncate = (str: string): string => {
    return str.length > 35 ? str.slice(0, 35) + "..." : str;
  };

  return (
    <div
      onClick={handleCardClick}
      style={{ borderWidth: "1px", borderColor: "lightgray" }}
      className="relative w-full h-78 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      <div className="w-full flex justify-center p-2 overflow-hidden">
        <img
          className="h-48 object-contain overflow-hidden"
          src={product.images[0] || "https://via.placeholder.com/150"}
          alt={product.title}
        />
      </div>

      <div className="details p-1 pl-4 pr-4">
        <h1 style={{ color: "#002f34" }} className="font-bold text-xl">
          ₹{" "}
          {typeof product.price === "number"
            ? product.price.toLocaleString()
            : product.price}
        </h1>
        <p className="pt-2 text-sm font-normal text-[#7f8187]">
          {Truncate(product.title)}
        </p>

        <p className="absolute bottom-2 pt-2 text-xs font-medium  text-[#a4a5a7]">
          Malappuram,Kerala
        </p>
        <p className="absolute bottom-2 right-2 pt-2 text-xs font-medium  text-[#a4a5a7]">
          2 days ago
        </p>
      </div>

      <div className="absolute flex justify-center items-center p-2 bg-white rounded-full top-4 right-3 cursor-pointer hover:shadow-lg transition-all duration-200">
        <Heart className="transition-colors duration-200 text-black hover:text-red-400" />
      </div>
    </div>
  );
};

export default ProductCard;
