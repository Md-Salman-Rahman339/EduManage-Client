import Lottie from 'lottie-react';
import register from '../../assets/lottie/register.json'
import { useForm } from 'react-hook-form';

const SignUp = () => {

    const {register,handleSubmit,formState:{errors}}=useForm();
    const onSubmit=data=>{
        console.log(data)
    }
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign up now!</h1>
      <Lottie animationData={register} loop:true></Lottie>
      
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
           {errors.name && <span className="text-red-600">Name is required</span>}
        </div>
          <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input type="url" {...register("photo", { required: true })} name="photo" placeholder="Photo Url" className="input input-bordered" />
           {errors.name && <span className="text-red-600">Photo is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email"  {...register("email", {required: true})} name="email" placeholder="email" className="input input-bordered" />
           {errors.email && <span className="text-red-600">Email is required</span>}
        </div>
       <div className="form-control">
            <label className="label">
                <span className="label-text">Role</span>
            </label>
            <select  {...register("role", {required: true})} name="role" defaultValue="" className="select select-bordered">
                <option value="" disabled>Your Role</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
            </select>
             {errors.email && <span className="text-red-600">Roll is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text"  {...register("password", { required: true, minLength: 6, maxLength: 20 })} placeholder="password" className="input input-bordered" />
           {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary bg-green-500 text-white">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default SignUp;