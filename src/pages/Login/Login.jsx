import React from 'react'
import loginLottie from '../../assets/lottie/edulogin.json'
import Lottie from 'lottie-react';

const Login = () => {
      const handleLogin=event=>{
        event.preventDefault();
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password)
    }

  return (
   <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col md:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold items-start">Login now!</h1>
            <Lottie animationData={loginLottie}></Lottie>
        </div>
        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
                  <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="name" name="name" placeholder="Write your name" className="input input-bordered" />
                </div>
                  <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="photo" name="photo" placeholder="photo link" className="input input-bordered" />
                </div>





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
        </div>
    </div>
</div>
  )
}

export default Login
