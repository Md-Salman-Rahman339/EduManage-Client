import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAdmin from '../../hooks/useAdmin';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const url = isAdmin ? '/admin/payments' : `/payments/${user.email}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <p>Loading payment history...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">
        {isAdmin ? 'All Users Payment History' : 'Your Payment History'}
      </h2>
      <p className="mb-4 text-gray-600">Total Payments: {payments.length}</p>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              {isAdmin && <th>Email</th>}
              <th>Price</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                {isAdmin && <td>{payment.email}</td>}
                <td>${payment.price}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.status}</td>
                <td>{payment.date || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
