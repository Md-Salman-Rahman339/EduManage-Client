// import React from "react";
// import { motion } from "framer-motion";
// import useClass from "../../hooks/useClass";
// import { textVariant } from "../../utils/motion";
// import ClassCard from "./ClassCard";

// const Classes = () => {
//   const [classes, loading] = useClass();

//   if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

//   return (
//     <>
//       <motion.div variants={textVariant()}>
//         <p className="text-gray-500 uppercase text-sm">Available Courses</p>
//         <h2 className="text-3xl font-bold text-black dark:text-white">Classes</h2>
//       </motion.div>

//       <div className="mt-10 flex flex-wrap gap-7">
//         {classes.map((item, index) => (
//           <ClassCard key={item._id} item={item} index={index} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default Classes;
import React from "react";
import { motion } from "framer-motion";

import { textVariant } from "../../utils/motion";
import ClassCard from "./ClassCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Classes = () => {
  const [classes, setClasses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const axiosSecure = useAxiosSecure();

  React.useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosSecure.get('/api/classes/');
        setClasses(response.data);
      } catch (err) {
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="text-gray-500 uppercase text-sm">Available Courses</p>
        <h2 className="text-3xl font-bold text-black dark:text-white">Classes</h2>
      </motion.div>

      <div className="mt-10 flex flex-wrap gap-7">
        {classes.map((item, index) => (
          <ClassCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </>
  );
};

export default Classes;