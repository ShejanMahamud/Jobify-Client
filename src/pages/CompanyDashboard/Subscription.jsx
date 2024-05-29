import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Modal, Tabs } from 'antd'
import moment from 'moment'
import React, { memo, useEffect, useState } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { IoCardOutline } from 'react-icons/io5'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import useCurrency from '../../hooks/useCurrency'
import useUserInfo from '../../hooks/useUserInfo'
import CheckoutForm from './CheckoutForm'

const Subscription = () => {
  const [clientSecret,setClientSecret] = useState()
  const [plan,setPlan] = useState(null)
  const [price,setPrice] = useState(0)
  const [paymentModal, setPaymentModal] = useState(false);
  const [method,setMethod] = useState(null)
  const stripePromise = loadStripe(import.meta.env.VITE_PK);
  const {usd} = useCurrency(price)

    
  useEffect(() => {
      const getPaymentIntent = async () => {
        const {data} = await axiosSecure.post(`/create-payment-intent`,{price:usd})
        setClientSecret(data.clientSecret)
      }
      if(usd){
        getPaymentIntent()
      }
  }, [usd]);

  const handlePaymentModal = (plan,price) => {
    setPaymentModal(true)
    setPlan(plan)
    setPrice(price)
  }

    const purchase_date = moment().format("MMMM D, YYYY")
    const expiration_date = moment().add(1, 'month').format("MMMM D, YYYY");
    const {user} = useUserInfo()
const axiosSecure = useAxiosSecure()

    const handlePlans = async () => {
        const {data} = await axiosSecure.post(`/plans`,{user_email: user?.email,plan:plan,price: price,purchase_date,expiration_date,currency:'BDT'})
        window.location.replace(data.url)
    }

    const items = [
      {
        key: '1',
        label: <div className='flex items-center gap-2 text-primary font-medium'>
        <IoCardOutline className='text-2xl'/> 
        <p>Debit/Credit Card</p>
      </div>,
        children: <div className='flex flex-col items-start w-full gap-5'>
              <div className="flex flex-col items-start gap-1 w-full">
      <h1 className="text-sm text-[#18191C] mb-1">Name on Card</h1>
      <input
        type="text"
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
        name="name"
        required
        placeholder="Name on Card"
      />
    </div>
    <Elements stripe={stripePromise}>
      <CheckoutForm clientSecret={clientSecret} plan={plan}/>
    </Elements>
        </div>,
      },
      {
        key: '2',
        label: <div className='flex items-center gap-2 text-primary font-medium'>
        <img src="https://sslcommerz.com/wp-content/uploads/2020/03/favicon.png" alt="" />
        <p>SSL COMMERZ</p>
      </div>,
        children: <button type="submit"  onClick={handlePlans} className="bg-primary px-4 py-3 rounded-md text-white font-medium flex items-center justify-center gap-3 w-full mt-5">
        <span>Pay Now</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 12H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 5L19 12L12 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </button>,
      },
    ];

  return (
    <div className=''>
      <div className="w-full flex items-center justify-between mt-8 gap-20">
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-2xl font-medium">
            Buy Premium Subscription to Post a Job
          </h1>
          <p className="text-[#5E6670] text-sm">
            Donec eu dui ut dolor commodo ornare. Sed arcu libero, malesuada
            quis justo sit amet, varius tempus neque. Quisque ultrices mi sed
            lorem condimentum, vel tempus lectus ultricies.
          </p>
        </div>
        <img src="https://i.ibb.co/n8C94D1/Status-update-bro-1.png" alt="" />
      </div>
      <div className="w-full grid grid-cols-3 row-auto items-stretch gap-6 mt-10">
        <div className="w-full flex flex-col items-start border border-[#E4E5E8] px-5 py-5 rounded-lg gap-2 focus:border-primary">
          <h1 className="uppercase font-medium">Basic</h1>
          <p className="text-[#767F8C] text-sm">
            Praesent eget pulvinar orci. Duis ut pellentesque ligula convalis.
          </p>
          <p className="text-primary text-3xl font-medium">
          ৳499 <span className="text-base font-normal">/Monthly</span>
          </p>
          <hr className="border border-[#e4e5e8] w-full my-3" />
          <div className="flex flex-col items-start gap-5">
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">Post 5 Job</h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Urgents & Featured Jobs
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Highlights Job with Colors
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Access & Saved 10 Candidates
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                10 Days Resume Visibility
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">24/7 Critical Support</h1>
            </div>
          </div>

          <button onClick={()=>handlePaymentModal('basic',499)} className="hover:bg-primary bg-[#E7F0FA] px-4 py-2 rounded-md text-primary hover:text-white font-medium gap-2 mt-8 w-full flex justify-center items-center">
            <span>Choose plan</span>
            <IoIosArrowRoundForward className="text-4xl" />
          </button>
        </div>

        <div className="w-full flex flex-col items-start border-2 px-5 py-5 rounded-lg gap-2 border-primary relative">
          <div className="px-2 text-xs absolute  right-0 top-0 py-2 rounded-sm bg-primary text-white font-medium">
            Recommended
          </div>
          <h1 className="uppercase font-medium">Standard</h1>
          <p className="text-[#767F8C] text-sm">
            Praesent eget pulvinar orci. Duis ut pellentesque ligula convalis.
          </p>
          <p className="text-primary text-3xl font-medium">
          ৳699 <span className="text-base font-normal">/Monthly</span>
          </p>
          <hr className="border border-[#e4e5e8] w-full my-3" />
          <div className="flex flex-col items-start gap-5">
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">Post 10 Job</h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Urgents & Featured Jobs
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Highlights Job with Colors
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Access & Saved 20 Candidates
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                20 Days Resume Visibility
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">24/7 Critical Support</h1>
            </div>
          </div>

          <button onClick={()=>handlePaymentModal('standard',699)} className="bg-primary hover:bg-[#E7F0FA] px-4 py-2 rounded-md hover:text-primary text-white font-medium gap-2 mt-8 w-full flex justify-center items-center">
            <span>Choose plan</span>
            <IoIosArrowRoundForward className="text-4xl" />
          </button>
        </div>

        <div className="w-full flex flex-col items-start border border-[#E4E5E8] px-5 py-5 rounded-lg gap-2 focus:border-primary">
          <h1 className="uppercase font-medium">PREMIUM</h1>
          <p className="text-[#767F8C] text-sm">
            Praesent eget pulvinar orci. Duis ut pellentesque ligula convalis.
          </p>
          <p className="text-primary text-3xl font-medium">
          ৳999 <span className="text-base font-normal">/Monthly</span>
          </p>
          <hr className="border border-[#e4e5e8] w-full my-3" />
          <div className="flex flex-col items-start gap-5">
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">Post 20 Job</h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Urgents & Featured Jobs
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Highlights Job with Colors
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Access & Saved 50 Candidates
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                50 Days Resume Visibility
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">24/7 Critical Support</h1>
            </div>
          </div>

          <button onClick={()=>handlePaymentModal('premium',999)} className="hover:bg-primary bg-[#E7F0FA] px-4 py-2 rounded-md text-primary hover:text-white font-medium gap-2 mt-8 w-full flex justify-center items-center">
            <span>Choose plan</span>
            <IoIosArrowRoundForward className="text-4xl" />
          </button>
        </div>
      </div>
      <Modal
        width={800}
        footer={false}
        open={paymentModal}
        onCancel={() => setPaymentModal(false)}
      >
        <h1 className="text-[#18191C] font-medium text-xl my-3">
          Checkout
        </h1>
        <hr className='border border-[#E4E5E8] w-full my-5'/>
        
        <div className='w-full grid grid-cols-2 row-auto items-start gap-5'>
        <div className='flex flex-col items-start gap-2 w-full border border-[#E4E5E8] p-3 rounded-lg'>
        <h1 className="text-[#18191C] font-medium text-base my-2">
          Payment Method
        </h1>
        <Tabs defaultActiveKey="2" items={items} className='w-full' onChange={(key)=>{
          setMethod(key)
        }}/>
        </div>
        <div>
        <div className='w-full border border-[#E4E5E8] p-3 rounded-lg flex flex-col items-start gap-2'>
        <h1 className="text-[#18191C] font-medium text-base my-2">
          Plan Details
        </h1>
        <div className='w-full flex items-center justify-between'>
        <h1 className=" text-sm text-[#9199A3] my-2">
          Pricing Plan : <span className='text-[#18191C] font-medium text-base uppercase '>{plan}</span>
        </h1>
        <p className='text-[#18191C] text-base'>{
          method === '1' ? `${usd} USD` : <>{price} BDT</>
        }</p>
        </div>
        <div className='w-full flex items-center justify-between font-medium'>
        <h1 className=" text-base text-[#18191C] my-2">
          Total: 
        </h1>
        <p className='text-[#18191C] text-base'>{
          method === '1' ? `${usd} USD` : <>{price} BDT</>
        }</p>
        </div>
        </div>
        <p className='text-sm text-[#9199A3] my-3'>This package will expire after one month.</p>
        </div>
        </div>
      </Modal>
    </div>
  )
}

export default memo(Subscription)