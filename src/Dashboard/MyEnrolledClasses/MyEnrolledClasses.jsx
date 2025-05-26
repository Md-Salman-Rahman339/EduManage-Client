import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ClassCard from '../../pages/Classes/ClassCard';


const MyEnrolledClasses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { 
    data: enrolledClasses = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['enrolled-classes', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolled-classes/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <span className="loading loading-spinner loading-xs"></span>;
  if (error) return <p className="text-center text-red-500">Error loading classes</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle 
        heading="My Enrolled Classes" 
        subHeading="Courses you've joined" 
      />

      {enrolledClasses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">You haven't enrolled in any classes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          {enrolledClasses.map((item, index) => (
            <ClassCard 
              key={item._id} 
              item={item} 
              index={index}  
              enrolledView={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrolledClasses;