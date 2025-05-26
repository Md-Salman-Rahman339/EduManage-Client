import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { fadeIn } from '../../utils/motion';

const MyClass = () => {
    const { user } = useAuth();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axiosSecure.get(`/my-class/${encodeURIComponent(user.email)}`);
                setClasses(response.data);
            } catch (err) {
                console.error("Error fetching classes:", err);
                setError(err.message || 'Failed to fetch classes');
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchClasses();
        }
    }, [user?.email, axiosSecure]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            try {
                await axiosSecure.delete(`/classes/delete/${id}`);
                setClasses(prev => prev.filter(c => c._id !== id));
            } catch (err) {
                console.error("Error deleting class:", err);
                alert('Failed to delete class');
            }
        }
    };

    if (loading) return <div>Loading classes...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Classes</h2>
            {classes.length === 0 ? (
                <div>No classes found</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((cls, index) => (
                        <motion.div
                            key={cls._id}
                            variants={fadeIn("up", "spring", index * 0.5, 0.75)}
                        >
                            <Tilt
                                options={{ max: 45, scale: 1, speed: 450 }}
                                className="bg-white dark:bg-tertiary p-5 rounded-2xl shadow-md h-[310px] flex flex-col justify-between"
                            >
                                <div className="relative w-full h-[150px]">
                                    <img
                                        src={cls.image}
                                        alt={cls.title}
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                </div>

                                <div className="mt-5">
                                    <h3 className="text-black dark:text-white font-bold text-[22px]">
                                        {cls.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-secondary text-sm mt-1">
                                        Status: <span className={`font-medium ${
                                            cls.status === 'approved' ? 'text-green-500' :
                                            cls.status === 'pending' ? 'text-yellow-500' : 
                                            'text-red-500'
                                        }`}>{cls.status}</span>
                                    </p>
                                    <p className="mt-2 text-gray-700 dark:text-secondary text-[14px]">
                                        Enrolled: {cls.enrolledCount || 0}
                                    </p>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Link to={`/dashboard/update-class/${cls._id}`}>
                                        <Button variant="contained" color="primary" size="small">Update</Button>
                                    </Link>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(cls._id)}
                                    >
                                        Delete
                                    </Button>
                                    {cls.status === 'approved' && (
                                        <Link to={`/dashboard/myClassDetails/${cls._id}`}>
                                            <Button variant="contained" color="success" size="small">See Details</Button>
                                        </Link>
                                    )}
                                </div>
                            </Tilt>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyClass;
