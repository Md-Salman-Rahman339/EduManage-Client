import React from 'react'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'
const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
  return (
    <div>
        <SectionTitle heading="Payment" subHeading="Please pay to see Our Course Video"></SectionTitle>

        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>

            </Elements>
        </div>
      
    </div>
  )
}

export default Payment
