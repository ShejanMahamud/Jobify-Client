import { Breadcrumb } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Company from "../Utils/Company";

const FindCompanies = () => {
  const [itemsPerPage,setItemsPerPage] = useState(5);
  const [companies, setCompanies] = useState([])
  const [count,setCount] = useState(0);
  const numberOfPages = Math.ceil(count / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1)

  const pages = [...Array(numberOfPages).keys()].map(num => num  + 1)

useEffect(()=>{
  const getData = async () => {
    const {data} = await axios.get(`http://localhost:5948/companies?page=${currentPage}&size=${itemsPerPage}`)
    setCompanies(data)
  }
  getData();
},[currentPage,itemsPerPage])

useEffect(()=>{
  const getCount = async () => {
    const {data} = await axios.get(`http://localhost:5948/company_search`)
    setCount(data.count)
  }
  getCount();
},[])

// if(loading){
//   return <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
//   <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
//   <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
//   <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
// </div>
// }

  return (
    <div className="font-inter w-full">
      <div className="bg-[#F1F2F4] py-10 flex flex-col items-center gap-5 w-full px-20">
        <div className="flex items-center justify-between w-full ">
          <h1 className="text-[#18191C] text-lg font-medium">Find Companies</h1>
          <Breadcrumb
            separator=">"
            items={[
              {
                title: "Home",
              },
              {
                title: "Find Companies",
                href: "/find_companies",
              },
            ]}
          />
        </div>
        <form className="bg-white px-5 py-3 rounded-lg flex justify-between items-center gap-10 w-full">
            <div className="flex items-center gap-3 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#0A65CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 21.0004L16.65 16.6504" stroke="#0A65CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<input name="title" type="text" className="w-full bg-transparent focus:outline-none" placeholder="Company Name"/>
            </div>
            <div className="w-[2px] h-[20px] bg-[#E4E5E8] rounded-full"></div>
            <div className="flex items-center gap-3 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<input name="location" type="text" className="w-full bg-transparent focus:outline-none" placeholder="Company Location"/>
            </div>
          

            <button type="submit" className="bg-primary text-white font-medium px-4 py-3 rounded-lg w-[20%]">
                Find Job
            </button>
        </form>
      </div>
      <div className="py-10 px-20">
            <div className="flex w-full items-center justify-end">

                <div className="flex items-center gap-5">
                    <div className="flex items-center px-5 py-3 gap-3 rounded-lg border border-[#E4E5E8]">
                        <span className="text-xs">Items Per Page</span>
                        <select defaultValue={itemsPerPage} onChange={(e)=>setItemsPerPage(e.target.value)} name="page" className="text-sm focus:outline-none">
                            <option value="5" selected>5</option>
                            <option value="10" >10</option>
                            <option value="15" >15</option>
                            <option value="20" >20</option>
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M5 7.5L10 12.5L15 7.5" stroke="#9199A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                    </div>
                    <div className="border border-[#E4E5E8] px-5 py-2 rounded-lg flex items-center gap-5">
                        <button onClick={()=>setShowCard(true)} className={`px-1 py-1 bg-[#E4E5E8] rounded-md`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={'focus:*:fill-[#18191C]'}>
  <path d="M8 3H4C3.44772 3 3 3.44772 3 4V8C3 8.55228 3.44772 9 4 9H8C8.55228 9 9 8.55228 9 8V4C9 3.44772 8.55228 3 8 3Z" fill="#939AAD"/>
  <path d="M16 3H12C11.4477 3 11 3.44772 11 4V8C11 8.55228 11.4477 9 12 9H16C16.5523 9 17 8.55228 17 8V4C17 3.44772 16.5523 3 16 3Z" fill="#939AAD"/>
  <path d="M16 11H12C11.4477 11 11 11.4477 11 12V16C11 16.5523 11.4477 17 12 17H16C16.5523 17 17 16.5523 17 16V12C17 11.4477 16.5523 11 16 11Z" fill="#939AAD"/>
  <path d="M8 11H4C3.44772 11 3 11.4477 3 12V16C3 16.5523 3.44772 17 4 17H8C8.55228 17 9 16.5523 9 16V12C9 11.4477 8.55228 11 8 11Z" fill="#939AAD"/>
</svg>
                        </button>
                        <button onClick={()=>setShowCard(false)} className="px-1 py-1 bg-[#E4E5E8] rounded-md group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-focus:fill-[#18191C]">
  <path d="M16 3H4C3.44772 3 3 3.44772 3 4V8C3 8.55228 3.44772 9 4 9H16C16.5523 9 17 8.55228 17 8V4C17 3.44772 16.5523 3 16 3Z" fill="#939AAD"/>
  <path d="M16 3H12C11.4477 3 11 3.44772 11 4V8C11 8.55228 11.4477 9 12 9H16C16.5523 9 17 8.55228 17 8V4C17 3.44772 16.5523 3 16 3Z" fill="#939AAD"/>
  <path d="M16 11H12C11.4477 11 11 11.4477 11 12V16C11 16.5523 11.4477 17 12 17H16C16.5523 17 17 16.5523 17 16V12C17 11.4477 16.5523 11 16 11Z" fill="#939AAD"/>
  <path d="M16 11H4C3.44772 11 3 11.4477 3 12V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V12C17 11.4477 16.5523 11 16 11Z" fill="#939AAD"/>
</svg>
                        </button>
                    </div>
                </div>
            </div>
      </div>
      {/* <div className={`py-10 px-20 w-full grid ${showCard ? 'grid-cols-3' : 'grid-cols-1'} row-auto items-center gap-10`}>
        
        {
          showCard ? jobs && jobs.map(job => <CardJob key={job._id} job={job}/>) : jobs && jobs.map(job => <Job key={job._id} job={job}/>)
        }
      </div> */}
      <div className={`py-10 px-20 w-full grid grid-cols-1 row-auto items-center gap-10`}>
      {
       companies && companies.map(company => <Company key={company._id} company={company}/>)
      }
      </div>
      <div className="flex items-center gap-5 py-10 px-20 w-full justify-center">
      <button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage === 1} className={` flex items-center justify-center h-10 w-10 rounded-full text-2xl ${currentPage === 1 ? 'text-[#99C2FF] bg-[#E7F0FA]' : 'bg-[#E7F0FA] text-primary'}`}>
      <IoIosArrowBack />
            </button>
         {
          pages.map(page => (
            <button key={page} onClick={()=>setCurrentPage(page)} className={`flex items-center justify-center h-10 w-10 rounded-full text-lg font-medium ${currentPage === page ? 'bg-primary text-white ': 'bg-[#F1F2F4] text-[#5E6670]'}`}>
            {page}
            </button>
          ))
         }
               <button disabled={currentPage === numberOfPages} onClick={()=>setCurrentPage(currentPage + 1)} className={`bg-[#E7F0FA] flex items-center justify-center h-10 w-10 rounded-full text-2xl text-primary} ${currentPage === numberOfPages ? 'text-[#99C2FF] bg-[#E7F0FA]' : 'bg-[#E7F0FA] text-primary'}`}>
      <IoIosArrowForward/>
            </button>
      </div>
    </div>
  );
};

export default FindCompanies;
