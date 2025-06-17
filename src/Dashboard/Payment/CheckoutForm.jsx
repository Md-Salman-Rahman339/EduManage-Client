import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [classTitle, setClassTitle] = useState('');
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { price = 0, title, classId = null } = location.state || {};
  const priceValue = parseFloat(price);

  // Step 1: Create Payment Intent
  useEffect(() => {
    if (!priceValue || !classId) {
      setError('Missing payment details');
      return;
    }

    axiosSecure.post('/api/payments/create-payment-intent/', { 
      price: priceValue,
      class_id: classId
    })
    .then(response => {
      setClientSecret(response.data.clientSecret);
      setClassTitle(response.data.class_title || title);
    })
    .catch(err => {
      setError(err.response?.data?.error || 'Failed to initialize payment');
    });
  }, [priceValue, classId, axiosSecure]);

  // Step 2: Handle Payment Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setError('Payment system not ready');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // Step 2a: Confirm Card Payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: user?.email,
              name: user?.displayName || '',
            },
          },
        }
      );

      if (stripeError) throw new Error(stripeError.message);
      if (paymentIntent.status !== 'succeeded') throw new Error('Payment failed');

      // Step 2b: Save to Backend
      const { data } = await axiosSecure.post('/api/payments/confirm/', {
        transaction_id: paymentIntent.id,
        class_id: classId,
        title: classTitle || title,
      });

      // Step 2c: Show Success
      await Swal.fire({
        icon: 'success',
        title: 'Payment Completed!',
        text: `$${priceValue.toFixed(2)} paid successfully`,
        confirmButtonText: 'View History'
      });
      navigate('/dashboard/paymentHistory');

    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      {classTitle && <p className="mb-2">Course: <span className="font-semibold">{classTitle}</span></p>}
      <p className="mb-4">Amount: <span className="font-bold text-green-600">${priceValue.toFixed(2)}</span></p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6 p-3 border rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#9e2146' },
              },
            }}
          />
        </div>
        
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
            processing || !stripe || !clientSecret
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {processing ? 'Processing...' : `Pay $${priceValue.toFixed(2)}`}
        </button>
        
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;