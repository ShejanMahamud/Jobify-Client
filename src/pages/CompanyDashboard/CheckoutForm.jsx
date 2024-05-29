import {
  CardElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import React, { memo } from 'react';
import toast from 'react-hot-toast';
import useUserInfo from '../../hooks/useUserInfo';

const CheckoutForm = ({clientSecret,plan}) => {
    const stripe = useStripe();
    const elements = useElements();
    const {userInfo} = useUserInfo()
    const handleStripePayment = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }

      const {paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
      const {paymentIntent,error} = await stripe.confirmCardPayment(clientSecret,{
        payment_method: {
          card: card,
          billing_details:{
            email: userInfo?.email,
            name: userInfo?.name,
          }
        }
      }) 
      if(paymentIntent){
        toast.success('Payment Success')
      }
    };
  
    return (
        <form onSubmit={handleStripePayment} className='w-full'>
        <h1 className="text-sm text-[#18191C] mb-2">Credit Card</h1>
        <div className="p-4 border border-[#E4E5E8] rounded-lg">
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
        </div>

        <button type="submit"  disabled={!stripe || !clientSecret} className="bg-primary px-4 py-3 rounded-md text-white font-medium flex items-center justify-center gap-3 w-full mt-5">
<span>Pay Now</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5 12H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5L19 12L12 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
      </form>
      
    );
  };

export default memo(CheckoutForm)

