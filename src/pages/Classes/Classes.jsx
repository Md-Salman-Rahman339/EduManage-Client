import React from "react";
import { motion } from "framer-motion";
import useClass from "../../hooks/useClass";
import { textVariant } from "../../utils/motion";
import ClassCard from "./ClassCard";

const Classes = () => {
  const [classes, loading] = useClass();

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="text-gray-500 uppercase text-sm">Available Courses</p>
        <h2 className="text-3xl font-bold text-black dark:text-white">Classes</h2>
      </motion.div>

      <div className="mt-10 flex flex-wrap gap-7">
        {classes.map((item, index) => (
          <ClassCard key={item._id} item={item} index={index} />
        ))}
      </div>
    </>
  );
};

export default Classes;
