import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import { Button } from "@mui/material";

const ClassDetailsPage = () => {
  const classData = useLoaderData();
  console.log(classData)

  const {
    title,
    name,
    image,
    price,
    description,
    shortDescription,
    totalEnrolment,
  } = classData ||{};

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.2, 0.75)}
      className="max-w-3xl mx-auto my-10 p-6 bg-white dark:bg-tertiary rounded-2xl shadow-md"
    >
      <Tilt options={{ max: 45, scale: 1, speed: 450 }}>
        <div className="w-full h-[300px] mb-6">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-secondary mb-4">
          Instructor: {name}
        </p>
        <p className="text-gray-700 dark:text-secondary text-[16px] mb-4">
          {shortDescription}
        </p>
        <p className="text-gray-700 dark:text-secondary text-[15px] mb-4">
          {description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-semibold text-xl">
            ${price}
          </span>
          <Link to="/payment"> <Button variant="contained">Pay Now</Button> </Link>
          <span className="text-gray-500">
            Enrolled Students: {totalEnrolment}
          </span>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default ClassDetailsPage;
