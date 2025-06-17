import Lottie from 'lottie-react';
import registerL from '../../assets/lottie/register.json';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      photo: data.photo || '',
      role: 'student'
    };

    createUser(userData)
      .then(() => {
        Swal.fire({
          title: 'Registration Successful',
          text: 'You have been registered and logged in',
          icon: 'success'
        });
        reset();
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Registration Failed',
          text: error.response?.data?.email?.[0] || 'Registration failed',
          icon: 'error'
        });
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up now!</h1>
          <Lottie animationData={registerL} className="w-full max-w-md" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                placeholder="your_username"
                className="input input-bordered"
              />
              {errors.username && <span className="text-red-600 text-sm">{errors.username.message}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                {...register("first_name", { required: "First name is required" })}
                placeholder="First name"
                className="input input-bordered"
              />
              {errors.first_name && <span className="text-red-600 text-sm">{errors.first_name.message}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                {...register("last_name", { required: "Last name is required" })}
                placeholder="Last name"
                className="input input-bordered"
              />
              {errors.last_name && <span className="text-red-600 text-sm">{errors.last_name.message}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="email@example.com"
                className="input input-bordered"
              />
              {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                placeholder="••••••••"
                className="input input-bordered"
              />
              {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL (Optional)</span>
              </label>
              <input
                type="url"
                {...register("photo")}
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered"
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary bg-purple-800 text-white">
                Sign Up
              </button>
            </div>
          </form>

          <div className="px-6 pb-4">
            <p className="text-sm text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
