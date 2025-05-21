import React from "react";
import {Tilt} from "react-tilt"; 
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ClassCard = ({ item, index }) => {
  const {
    _id,
    title,
    name,
    image,
    price,
    shortDescription,
    totalEnrolment,
  } = item;

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-white dark:bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full shadow-md h-[500px] flex flex-col justify-between"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="mt-5">
          <h3 className="text-black dark:text-white font-bold text-[22px]">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-secondary text-sm mt-1">
            Instructor: {name}
          </p>
          <p className="mt-2 text-gray-700 dark:text-secondary text-[14px]">
            {shortDescription}
          </p>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm">
          <span className="text-blue-600 font-semibold">${price}</span>
        <Link to={`/classDetails/${_id}`}><Button>Enroll</Button></Link>

          <span className="text-gray-500">Enrolled: {totalEnrolment}</span>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default ClassCard;
