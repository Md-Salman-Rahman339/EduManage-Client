import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { price = 0, title, classId } = location.state || {};
  const totalPrice = parseFloat(price).toFixed(2);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => {
          console.error('Payment intent error:', err);
          setError('Failed to initialize payment. Please try again.');
        });
    }
  }, [totalPrice, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setError('Stripe has not been initialized');
      return;
    }

    setProcessing(true);
    setError('');
    setTransactionId('');

    try {
      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      // Confirm payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
        receipt_email: user?.email,
      });

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent.id);
        
        // Save payment to database
        const paymentData = {
          email: user.email,
          price: parseFloat(totalPrice),
          transactionId: paymentIntent.id,
          title: title || 'Class Payment',
          classId: classId || null,
          date: new Date().toISOString(),
        };

        const { data } = await axiosSecure.post('/payments', paymentData);
        
        if (data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            text: `Your payment of $${totalPrice} has been processed.`,
            confirmButtonText: 'View Payment History'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/dashboard/paymentHistory');
            }
          });
        }
      }
    } catch (err) {
      console.error('Payment processing error:', err);
      setError('An error occurred during payment processing. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      {title && <p className="mb-2">Course: <span className="font-semibold">{title}</span></p>}
      <p className="mb-4">Amount: <span className="font-bold text-green-600">${totalPrice}</span></p>
      
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
          className="mb-4 p-3 border rounded"
        />
        
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className={`w-full py-2 px-4 rounded font-medium ${
            processing || !stripe || !clientSecret
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {processing ? 'Processing...' : `Pay $${totalPrice}`}
        </button>
        
        {error && <p className="mt-3 text-red-500">{error}</p>}
        {transactionId && (
          <p className="mt-3 text-green-600">
            Payment successful! Transaction ID: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;