import React, { useContext } from 'react'
import loginLottie from '../../assets/lottie/edulogin.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {

    const {signIn}=useContext(AuthContext);
     const navigate = useNavigate();
     const location = useLocation();
 
     const from = location.state?.from?.pathname || "/";
      const handleLogin=event=>{
        event.preventDefault();
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        signIn(email,password)
        .then(result=>{
            const user=result.user;
            console.log(user)
               Swal.fire({
                title: 'User Login Successful.',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
               navigate(from, { replace: true });
        })
        // console.log(email,password)
    }

  return (
   <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col md:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold items-start">Login now!</h1>
            <Lottie animationData={loginLottie} loop:true></Lottie>
        </div>
        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered" />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary bg-green-500 text-white" type="submit" value="Login" />
                </div>
            </form>
            <p><small>New Here? <Link to="/signup">Create an account</Link> </small></p>
        </div>
    </div>
</div>
  )
}

export default Login
