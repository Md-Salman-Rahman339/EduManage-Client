import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../providers/AuthProvider';

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, setValue } = useForm();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setValue("name", user.displayName || "");
      setValue("email", user.email || "");
      setValue("photo", user.photoURL || "");
      setLoading(false);
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    const { name, photo } = data;

    updateUserProfile(name, photo)
      .then(() => {
        // Update in your database
        axiosPublic.patch(`/users/${user.email}`, { name, photo })
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Profile updated successfully!',
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch(err => {
            console.error("Failed to update database:", err);
            Swal.fire('Error', 'Profile updated but failed to save to database', 'error');
          });
      })
      .catch(err => {
        console.error("Failed to update profile:", err);
        Swal.fire('Error', 'Failed to update profile', 'error');
      });
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>

      {/* Profile photo preview */}
      <div className="flex justify-center mb-4">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No photo</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input 
            {...register("name", { required: true })} 
            className="input input-bordered w-full" 
          />
        </div>
        <div>
          <label className="block font-medium">Photo URL</label>
          <input 
            {...register("photo")} 
            placeholder="Enter image URL" 
            className="input input-bordered w-full" 
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input 
            {...register("email")} 
            readOnly 
            className="input input-bordered w-full bg-gray-100" 
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-full bg-green-500 text-white"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};
export default Profile;
