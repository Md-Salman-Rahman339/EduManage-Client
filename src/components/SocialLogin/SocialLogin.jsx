import React from 'react'
import useAuth from '../../hooks/useAuth';
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
      const { googleSignIn } = useAuth();
 
     const handleGoogleSignIn = () =>{
         googleSignIn()
         .then(result =>{
             console.log(result.user);
         })
     }
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
