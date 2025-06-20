import React, { useState } from "react";
import { ChevronLeft, Upload } from "lucide-react";
import { uploadProduct } from "../services/FirebaseServices";
import { CategoryId, FormData as FormDataType } from "../types/product";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const categories = [
  { id: "cars", label: "Cars" },
  { id: "motorcycles", label: "Motorcycles" },
  { id: "mobile", label: "Mobile Phones"},
];

const PostAdPage: React.FC = () => {
  const { user } = UserAuth();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "">("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  console.log(selectedCategory)
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    price: "",
    description: "",
    category: "",
    moreInfo: {},
  });

  const handleChange = (fieldId: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }
    setImages((prev) => [...prev, ...files].slice(0, 4));
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required.";

    if (!formData.price.trim() || isNaN(Number(formData.price)))
      newErrors.price = "Valid price is required.";

    if (!formData.description.trim())
      newErrors.description = "Description is required.";

    // if (!formData.date.trim()) newErrors.date = "Please select a date.";

    if (!formData.category) newErrors.category = "Category is required.";

    if (images.length === 0) {
      newErrors.images = "At least one image is required.";
      toast.error("Please upload at least one image");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    if (!user) {
      toast.error("User not authenticated.");
      return;
    }

    setLoading(true);
    try {
      await uploadProduct(formData, images);
      toast.success("Ad posted successfully!");
      navigate("/");
    } catch (err) {
      console.log("Error uploading product:", err);
      toast.error("Failed to upload. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button type="button" className="mr-4" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-teal-900">POST YOUR AD</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">AD DETAILS</h2>

          <div className="mb-4">
            <label className="block text-sm mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full p-3 border rounded outline-none focus:border-teal-900"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Price</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="w-full p-3 border rounded outline-none focus:border-teal-900"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full p-3 border rounded outline-none focus:border-teal-900"
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">SELECT CATEGORY</h2>
          <select
            value={formData.category || ""}
            onChange={(e) => {
              const selected = e.target.value as CategoryId;
              handleChange("category", selected);
              setSelectedCategory(selected);
            }}
            className="w-full p-3 border rounded outline-none focus:border-teal-900"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">UPLOAD IMAGES</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4"
                >
                  {images[index] ? (
                    <div className="relative w-full h-full">
                      <img
                        src={URL.createObjectURL(images[index])}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">
                        Upload Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              ))}
          </div>
          {errors.images && (
            <p className="text-red-500 text-sm mt-2">{errors.images}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">Upload up to 4 images</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-8 w-full py-3 rounded-lg transition-colors ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-teal-900 hover:bg-teal-800 text-white"
          }`}
        >
          {loading ? "Loading..." : "Post Ad"}
        </button>
      </div>
    </form>
  );
};

export default PostAdPage;
