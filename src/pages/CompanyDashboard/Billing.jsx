import { useQuery } from "@tanstack/react-query";
import { Modal } from 'antd';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import React, { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCompanyInfo from "../../hooks/useCompanyInfo";
import Subscription from "./Subscription";
//if company hired then that hired perosn will be add on team section of team section
const Billing = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { resume_visibility_limit,plan,job_limit,resume_access_limit,email,company_name,phone,location } = useCompanyInfo();

  const { data: planInfo } = useQuery({
    queryKey: ["plan_info"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders?active=${true}`);
      return data[0];
    },
  });

  const { data: allPlans } = useQuery({
    queryKey: ["all_plans",  email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/orders?email=${email}&active=${true}`
      );
      return data;
    },
  });

  const downloadPDF = () => {
    const capture = document.querySelector('.invoice');
    if (capture) {
      html2canvas(capture).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm', 'a4');
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
        doc.save('invoice.pdf');
      }).catch(error => {
        console.error('Error capturing the invoice:', error);
      });
    } else {
      console.error('Invoice element not found.');
    }
  }

  return (
    <div className="border-l border-[#e4e5e8] w-full min-h-screen px-10 py-10 font-inter">
      {!(
         plan === "premium" ||
         plan === "basic" ||
         plan === "standard"
      ) ? <Subscription />
      :
      (<>
      <div className="w-full flex flex-col items-start gap-10">
        <div className="w=full flex flex-row items-start gap-5">
          <div className="w-full flex flex-col gap-5 items-start">
            <div className="w-full border border-[#e4e5e8] rounded-lg px-5 py-5 flex flex-col items-start gap-3">
              <h1 className="font-medium text-base">Current Plan</h1>
              <h1 className="text-lg font-medium uppercase">
                { plan}
              </h1>
              <p className="text-sm text-[#767F8C]">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere.
              </p>
              <div className="flex items-center gap-5 mt-3">
                <button className="text-primary hover:text-white hover:bg-primary bg-[#F1F2F4] rounded-md px-4 py-2 font-medium">
                  Change Plan
                </button>
                <button className="bg-transparent font-medium text-[#767F8C]">
                  Cancel Plan
                </button>
              </div>
            </div>
            <div className="w-full border border-[#e4e5e8] rounded-lg px-5 py-5 flex flex-col items-start gap-3">
              <h1 className="font-medium text-base">Next Invoices</h1>
              <h1 className="text-2xl text-primary font-medium uppercase">
                {planInfo?.currency === 'USD' ? '$' : '৳'} {planInfo?.price}
              </h1>
              <h1 className="font-medium text-base">
                {planInfo?.expiration_date}
              </h1>
              <h1 className="font-medium text-[#767F8C] text-sm">
                Plan Started:{" "}
                <span className="text-[#18191C] text-base">
                  {planInfo?.purchase_date}
                </span>
              </h1>
              <p className="text-[#767F8C] text-sm">
                You have to pay this amount of money every month.
              </p>
              <button className="hover:bg-[#E7F0FA] bg-primary px-4 py-2 rounded-md text-white hover:text-primary font-medium gap-2 mt-3 w-full flex justify-center items-center">
                <span>Pay Now</span>
                <IoIosArrowRoundForward className="text-4xl" />
              </button>
            </div>
          </div>
          <div className="w-full border border-[#e4e5e8] rounded-lg px-5 py-5 flex flex-col items-start gap-3">
            <h1 className="font-medium text-base">Plan Benefits</h1>
            <p className="text-sm text-[#767F8C]">
              Proin porta enim sit amet placerat finibus. Sed eget laoreet
              lorem.
            </p>
            <div className="w-full grid grid-cols-2 row-auto items-strech gap-x-10 gap-y-5 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.5625 6.5625L4.6875 13.4375L1.25 10.0002"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.7518 6.5625L11.8768 13.4375L10.0508 11.6116"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="text-[#474C54]">
                  {( plan === "basic" && 5) ||
                    ( plan === "standard" && 10) ||
                    ( plan === "premium" && 20)}{" "}
                  Active Jobs
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.5625 6.5625L4.6875 13.4375L1.25 10.0002"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.7518 6.5625L11.8768 13.4375L10.0508 11.6116"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="text-[#474C54]">Urgent & Featured Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.5625 6.5625L4.6875 13.4375L1.25 10.0002"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.7518 6.5625L11.8768 13.4375L10.0508 11.6116"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="text-[#474C54]">
                  Highlights Job with Colors
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.5625 6.5625L4.6875 13.4375L1.25 10.0002"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.7518 6.5625L11.8768 13.4375L10.0508 11.6116"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="text-[#474C54]">
                  Access & Saved{" "}
                  {( plan === "basic" && 10) ||
                    ( plan === "standard" && 20) ||
                    ( plan === "premium" && 50)}{" "}
                  Candidates
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.5625 6.5625L4.6875 13.4375L1.25 10.0002"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.7518 6.5625L11.8768 13.4375L10.0508 11.6116"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="text-[#474C54]">
                  {( plan === "basic" && 10) ||
                    ( plan === "standard" && 20) ||
                    ( plan === "premium" && 50)}{" "}
                  Days Resume Visibility
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.5625 6.5625L4.6875 13.4375L1.25 10.0002"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.7518 6.5625L11.8768 13.4375L10.0508 11.6116"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="text-[#474C54]">24/7 Critical Support</span>
              </div>
            </div>
            <hr className="border border-[#E4E5E8] w-full my-5" />
            <p className="text-sm text-[#767F8C]">Remaining</p>
            <div className="w-full grid grid-cols-2 row-auto items-strech gap-x-10 gap-y-5 text-sm">
              <div className="flex items-center gap-2">
                <IoCloseCircleOutline className="text-red-500 text-2xl" />
                <span className="text-[#474C54]">
                  { job_limit} Active Jobs
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IoCloseCircleOutline className="text-red-500 text-2xl" />
                <span className="text-[#474C54]">
                  { resume_access_limit} Resume Access{" "}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IoCloseCircleOutline className="text-red-500 text-2xl" />
                <span className="text-[#474C54]">
                  { resume_visibility_limit} Days Resume Visibility{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead className="bg-[#F1F2F4] uppercase">
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allPlans && allPlans.map((plan) => (
              <tr key={plan?._id}>
                <th className="font-normal">{plan?.tran_id}</th>
                <td>{plan?.purchase_date}</td>
                <td className="uppercase">{plan?.plan}</td>
                <td>{plan?.price} {plan?.currency}</td>
                <td>
                  <button onClick={()=>setIsModalOpen(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M8.0625 10.3145L12 14.2509L15.9375 10.3145"
                        stroke="#9199A3"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 3.75V14.2472"
                        stroke="#9199A3"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.25 14.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.25"
                        stroke="#9199A3"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <Modal width={800} open={isModalOpen} footer={false} onCancel={()=>setIsModalOpen(false)}>
                  
<div className="w-full invoice px-10 py-10">
<div className="w-full">
                <div className="flex w-full items-center justify-between">
                <div class="cursor-pointer flex mx-auto items-center justify-start w-full gap-2 my-5 px-5">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <g clip-path="url(#clip0_2202_13434)">
    <path d="M33.751 11.25H6.25098C5.56062 11.25 5.00098 11.8097 5.00098 12.5V32.5C5.00098 33.1904 5.56062 33.75 6.25098 33.75H33.751C34.4413 33.75 35.001 33.1904 35.001 32.5V12.5C35.001 11.8097 34.4413 11.25 33.751 11.25Z" stroke="#0A65CC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26.25 11.25V8.75C26.25 8.08696 25.9866 7.45107 25.5178 6.98223C25.0489 6.51339 24.413 6.25 23.75 6.25H16.25C15.587 6.25 14.9511 6.51339 14.4822 6.98223C14.0134 7.45107 13.75 8.08696 13.75 8.75V11.25" stroke="#0A65CC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M35.0012 19.7358C30.4423 22.3734 25.2669 23.7583 20 23.75C14.7339 23.7583 9.55935 22.3739 5.00098 19.7371" stroke="#0A65CC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.125 18.75H21.875" stroke="#0A65CC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_2202_13434">
      <rect width="40" height="40" fill="white"/>
    </clipPath>
  </defs>
</svg>
<span className="text-xl font-medium">Jobify</span>
    </div>
                  <span className="text-2xl font-medium">INVOICE</span>
                </div>
                <div className="w-full flex items-center justify-between mt-5">
                    <div className="flex flex-col items-start gap-1">
                      <p className="text-[#474C54] text-sm">Invoice to</p>
                      <h1 className="text-xl font-medium">{ company_name}</h1>
                      <p className="text-[#474C54] text-sm">{ phone}</p>
                      <p className="text-[#474C54] text-sm">{ location}</p>
                      <p className="text-[#474C54] text-sm">{ email}</p>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <p className="text-[#474C54] text-sm">Invoice No: {plan?.tran_id}</p>
                      <p className="text-[#474C54] text-sm">{plan?.purchase_date}</p>
                      <h1 className="text-2xl font-medium text-primary">{plan?.currency === 'USD' ? 'USD' : 'BDT'} {plan?.price} </h1>
                      <p className=" text-lg text-primary font-medium">PAID</p>
                    </div>
                </div>
                <div className="overflow-x-auto mt-10 flex w-full justify-center">
  <table className="table flex w-full justify-center">
    {/* head */}
    <thead>
      <tr className="uppercase">
        <th>Plan</th>
        <th>Tran ID</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th className="uppercase font-normal">{plan?.plan}</th>
        <td>{plan?.tran_id}</td>
        <td>{plan?.price}</td>
      </tr>
    </tbody>
  </table>
</div>
<hr className="w-full border border-[#E4E5E8]"/>
<div className="w-full flex justify-end pr-14 mt-4 text-lg fonr-medium">
<p>Total: {plan?.price}</p>
</div>
<div className="items-start flex-col gap-2 mt-5 flex text-lg font-medium">
<p>Payment Method: {plan?.payment_method}</p>
</div>


              </div>
              <div className="w-full flex items-center justify-between">
              <div className="flex flex-col items-start gap-1">
                      <p className="mt-5 text-base font-medium">Contact Us</p>
                      <p className="text-[#474C54] text-sm">+8801644494180</p>
                      <p className="text-[#474C54] text-sm">Rajshahi, Bangladesh</p>
                      <p className="text-[#474C54] text-sm">info@jobify.com</p>
                    </div>
              <div className="flex flex-col items-start gap-1">
              <p className="text-primary text-lg font-medium">Thanks for purchase!</p>
              <p className="text-[#474C54] text-sm">- Jobify Team</p>
                    </div>
             
              </div>
</div>
<button onClick={downloadPDF} className="bg-primary text-white font-medium px-4 py-2 rounded-md flex justify-center mt-5">Download Invoice</button>
      </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>)
      }
    </div>
  );
};

export default Billing;
