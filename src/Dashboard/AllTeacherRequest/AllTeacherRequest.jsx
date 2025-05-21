import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAdmin from '../../hooks/useAdmin';

const AllTeacherRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin, isAdminLoading] = useAdmin();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ['teacher-requests'],
    enabled: isAdmin, // Only fetch if admin
    queryFn: async () => {
      const res = await axiosSecure.get('/teacher-requests');
      return res.data;
    },
  });

  const handleApprove = async (req) => {
    try {
      const res = await axiosSecure.patch(`/teacher-requests/approve/${req._id}`);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire('Success', `${req.name} has been approved and promoted to Teacher`, 'success');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to approve request', 'error');
    }
  };

  const handleReject = async (req) => {
    try {
      const res = await axiosSecure.patch(`/teacher-requests/reject/${req._id}`);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire('Rejected', `${req.name}'s request has been rejected`, 'info');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to reject request', 'error');
    }
  };

  if (isAdminLoading) return <p>Loading...</p>;
  if (!isAdmin) return <p className="text-center text-red-500">Access denied. Admins only.</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4 text-center">All Teacher Requests</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr key={req._id}>
                <td>{idx + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={req.image} alt="User" />
                    </div>
                  </div>
                </td>
                <td>{req.name}</td>
                <td>{req.experience}</td>
                <td>{req.title}</td>
                <td>{req.category}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    req.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : req.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleApprove(req)}
                    disabled={req.status !== 'pending'}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req)}
                    disabled={req.status !== 'pending'}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTeacherRequests;
