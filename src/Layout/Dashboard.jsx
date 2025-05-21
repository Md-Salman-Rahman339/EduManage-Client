import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { NavLink, Outlet } from "react-router-dom";
import { fadeIn } from "../utils/motion";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin";
import {
  FaHome, FaList, FaUsers, FaUtensils, FaBook, FaShoppingCart, FaCalendar, FaAd, FaEnvelope, FaSearch,
  FaChalkboardTeacher,
  FaUser
} from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useTeacher from "../hooks/useTeacher";


const navItems = (isAdmin,isTeacher, cartLength = 0) => {
  if (isAdmin) {
    return [
      { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
      { to: "/dashboard/adminHome", icon: <FaHome />, label: "Admin Home" },
      { to: "/dashboard/teacherRequest", icon: <FaList />, label: "Teacher Request" },
      { to: "/dashboard/users", icon: <FaUsers />, label: "All Users" },
    ];
  } else if (isTeacher) {
    return [
      { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
      { to: "/dashboard/teacherHome", icon: <FaHome />, label: "Teacher Home" },
      { to: "/dashboard/addClass", icon: <FaUtensils />, label: "Add Class" },
      { to: "/dashboard/myClass", icon: <FaBook />, label: "My Class" },
    ];
  } else {
    return [
      { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
      { to: "/dashboard/userHome", icon: <FaHome />, label: "User Home" },
      { to: "/dashboard/myEnrollClass", icon: <FaBook />, label: "My Enrolled Class" },
    { to: "/dashboard/applyforteacher", icon: <FaChalkboardTeacher />, label: "Teach On Edumanage" },
    ];
  }
};

 
const sharedLinks = [
  { to: "/", icon: <FaHome />, label: "Home" },
  { to: "/order/contact", icon: <FaEnvelope />, label: "Contact" },
];

const Dashboard = () => {

  const [isAdmin] =useAdmin();
  const [isTeacher]=useTeacher();
 

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-green-100 to-white rounded-3xl mb-8 mt-8">
      {/* Sidebar */}
      <div className="md:w-64 w-full bg-green-500 py-8 px-4 shadow-lg rounded-3xl mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Dashboard</h2>
        {[...navItems(isAdmin,isTeacher), ...sharedLinks].map((item, index) => (
          <motion.div
            key={item.to}
            variants={fadeIn("right", "spring", index * 0.1, 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <Tilt options={{ max: 25, scale: 1, speed: 400 }}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl my-2 font-semibold text-white hover:bg-blue-500 transition duration-300 ${
                    isActive ? "bg-green-500" : ""
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
