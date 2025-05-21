import React from 'react'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise=loadStripe('')
const Payment = () => {
  return (
    <div>
        <SectionTitle heading="Payment" subHeading="Please pay to see Our Course Video"></SectionTitle>

        <div>
            <Elements stripe={stripePromise}>

            </Elements>
        </div>
      
    </div>
  )
}

export default Payment
