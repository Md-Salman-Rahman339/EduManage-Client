import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddClass = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    image: "",
    price: "",
    description: "",
    status: "pending", // fixed value
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, name, email, image, price, description } = formData;
    if (!title || !name || !email || !image || !price || !description) {
      Swal.fire("Missing Fields", "Please fill in all required fields", "warning");
      return;
    }

    try {
      await axiosPublic.post("/my-class", formData);
      Swal.fire("Success", "Class submitted for review!", "success");
      navigate("/dashboard/myClass");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add class", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Class</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Class Title"
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="text"
          name="name"
          value={formData.name}
          disabled
          className="w-full px-4 py-2 border rounded bg-gray-100"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
          className="w-full px-4 py-2 border rounded bg-gray-100"
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price ($)"
          className="w-full px-4 py-2 border rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded"
          required
        />

        {/* Hidden field for status */}
        <input type="hidden" name="status" value="pending" />

        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-blue-500 text-white rounded"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
