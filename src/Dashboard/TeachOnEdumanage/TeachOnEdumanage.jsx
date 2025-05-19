import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const TeachOnEdumanage = () => {
  const { user, role } = useAuth(); 
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    experience: "",
    title: "",
    category: "",
    status: "pending",
  });

  const [requestStatus, setRequestStatus] = useState(null); // 'pending', 'approved', 'rejected'

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
        image: user.photoURL || "",
      }));

      // Fetch existing request status
      axiosPublic.get(`/teacher-request/${user.email}`).then((res) => {
        if (res.data) {
          setRequestStatus(res.data.status);
        }
      }).catch((err) => {
        console.error("Failed to fetch request status", err);
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    const { name, email, experience, title, category } = formData;
    if (!name || !email || !experience || !title || !category) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete",
        text: "Please fill in all required fields.",
      });
      return;
    }

    try {
      await axiosPublic.post("/teacher-request", formData);
      setRequestStatus("pending");

      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Your request has been submitted for review.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  const handleReRequest = async () => {
    try {
      await axiosPublic.put(`/teacher-request/${user?.email}`, {
        ...formData,
        status: "pending",
      });
      setRequestStatus("pending");

      Swal.fire({
        icon: "success",
        title: "Re-Submitted!",
        text: "Your request has been re-submitted for review.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Re-Submission Failed",
        text: err?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  if (requestStatus === "approved") {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-green-600">Welcome, Teacher!</h1>
        <p className="mt-2 text-gray-600">Your request has been approved.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Teach on EduManage</h1>

      {requestStatus === "pending" && (
        <div className="text-blue-600 text-center mb-4">
          Your request is under review.
        </div>
      )}

      {requestStatus === "rejected" && (
        <div className="text-red-600 text-center mb-4">
          Your request was rejected.
          <button
            onClick={handleReRequest}
            className="ml-3 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Request Again
          </button>
        </div>
      )}

      {requestStatus === "approved" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Email (Read only)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full mt-1 px-4 py-2 border bg-gray-100 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Profile Image</label>
            <img
              src={formData.image}
              alt="profile"
              className="h-16 w-16 rounded-full object-cover mt-2"
            />
          </div>

          <div>
            <label className="block font-medium">Experience</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded"
              required
            >
              <option value="">Select experience</option>
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid-Level</option>
              <option value="experienced">Experienced</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Full Stack Developer"
              className="w-full mt-1 px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded"
              required
            >
              <option value="">Select category</option>
              <option value="Web Development">Web Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Data Science">Data Science</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 hover:bg-blue-500 text-white rounded"
          >
            Submit for Review
          </button>
        </form>
      )}
    </div>
  );
};

export default TeachOnEdumanage;
