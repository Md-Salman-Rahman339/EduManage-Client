import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAdmin from '../../hooks/useAdmin';
import Swal from 'sweetalert2';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import { Button } from '@mui/material';

const AdminClassApproval = () => {
    const axiosSecure = useAxiosSecure();
    const [isAdmin, isAdminLoading] = useAdmin();

    const { data: classes = [], refetch } = useQuery({
        queryKey: ['pending-classes'],
        enabled: isAdmin,
        queryFn: async () => {
            const res = await axiosSecure.get('/classes/pending');
            return res.data;
        }
    });

    const handleApprove = async (id) => {
        try {
            const result = await axiosSecure.patch(`/classes/approve/${id}`);
            if (result.data.modifiedCount > 0) {
                refetch();
                Swal.fire('Approved!', 'The class has been approved and will now appear on the site.', 'success');
            }
        } catch (error) {
            console.error('Error approving class:', error);
            Swal.fire('Error', 'Failed to approve class', 'error');
        }
    };

    const handleReject = async (id) => {
        try {
            const result = await axiosSecure.patch(`/classes/reject/${id}`);
            if (result.data.modifiedCount > 0) {
                refetch();
                Swal.fire('Rejected!', 'The class has been rejected.', 'info');
            }
        } catch (error) {
            console.error('Error rejecting class:', error);
            Swal.fire('Error', 'Failed to reject class', 'error');
        }
    };

    const handleViewProgress = (classId) => {
        // Implement progress viewing functionality
        console.log('View progress for class:', classId);
    };

    if (isAdminLoading) return <div>Loading...</div>;
    if (!isAdmin) return <div className="text-center text-red-500">Access denied. Admins only.</div>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Class Approval Dashboard</h2>
            
            {classes.length === 0 ? (
                <div className="text-center">No pending classes for approval</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((cls, index) => (
                        <motion.div
                            key={cls._id}
                            variants={fadeIn("up", "spring", index * 0.5, 0.75)}
                        >
                            <Tilt
                                options={{ max: 45, scale: 1, speed: 450 }}
                                className="bg-white dark:bg-tertiary p-5 rounded-2xl shadow-md h-[400px] flex flex-col justify-between"
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
                                        Posted by: {cls.email}
                                    </p>
                                    <p className="text-gray-600 dark:text-secondary text-sm mt-1">
                                        Status: <span className={`font-medium ${
                                            cls.status === 'approved' ? 'text-green-500' :
                                            cls.status === 'pending' ? 'text-yellow-500' : 
                                            'text-red-500'
                                        }`}>
                                            {cls.status}
                                        </span>
                                    </p>
                                    <p className="mt-2 text-gray-700 dark:text-secondary text-[14px]">
                                        {cls.description?.length > 100 
                                            ? `${cls.description.substring(0, 100)}...` 
                                            : cls.description}
                                    </p>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        onClick={() => handleApprove(cls._id)}
                                        disabled={cls.status !== 'pending'}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleReject(cls._id)}
                                        disabled={cls.status !== 'pending'}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        size="small"
                                        onClick={() => handleViewProgress(cls._id)}
                                        disabled={cls.status !== 'approved'}
                                    >
                                        Progress
                                    </Button>
                                </div>
                            </Tilt>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminClassApproval;