import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = () => {
     const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')

    const stripe=useStripe();
     const axiosSecure=useAxiosSecure();
    
    const totalPrice=((total,item)=>total+item.price,0)
    useEffect(()=>{
        axiosSecure.post('/create-payment-intent',{price:totalPrice})
        .then(res=>{
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })

    },[axiosSecure,totalPrice])
    const elements=useElements();
    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card=elements.getElement(CardElement)
        if(card==null){
            return;
        }
         const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:'card',
            card
        });
        if(error){
            console.log('payment error',error);
               setError(error.message)

        }
        else{
            console.log('payment method',paymentMethod);
            setError('')
        }
        }
    
  return (
    <form onSubmit={handleSubmit}>
    <CardElement
        options={{
            style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#9e2146',
                },
            },
        }}
    />
    <button className='btn btn-sm btn-primary my-4' type="submit"  disabled={!stripe || !clientSecret}>
        Pay
    </button>
     <p className="text-red-600">{error}</p>
</form>
  )
}

export default CheckoutForm
