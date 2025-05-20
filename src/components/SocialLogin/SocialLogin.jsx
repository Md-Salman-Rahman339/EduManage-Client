import React from 'react'
import useAuth from '../../hooks/useAuth';
import { FaGoogle } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
      const { googleSignIn } = useAuth();
      const axiosPublic=useAxiosPublic();
      const navigate=useNavigate();
 
    const handleGoogleSignIn = () => {
    googleSignIn()
    .then(async (result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };

      try {
        // Try to create user
        await axiosPublic.post('/users', userInfo);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          console.log('User already exists, proceeding...');
        } else {
          console.error('Unexpected error:', err);
          return;
        }
      }

      navigate('/');
    });
};

  return (
         <div className="p-8">
             <div className="divider"></div>
             <div>
                 <button onClick={handleGoogleSignIn} className="btn">
                     <FaGoogle className="mr-2"></FaGoogle>
                     Google
                 </button>
             </div>
         </div>
  )
}

export default SocialLogin
