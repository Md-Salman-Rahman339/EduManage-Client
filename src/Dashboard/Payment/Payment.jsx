// Payment.jsx (updated)
import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle heading="Payment" subHeading="Please pay to see Our Course Video" />
      <div className="max-w-2xl mx-auto mt-8">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

