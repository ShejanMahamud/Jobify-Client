import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUser =  () => { 
    const axiosSecure = useAxiosSecure()   
    const {user} = useAuth();
    const [userData, setUserData] = useState([])
   
    useEffect(()=>{
        const data = async () =>{
            const {data} = await axiosSecure.get(`http://localhost:5948/user/${user?.email}`)
            setUserData(data);
          }
          data();
    },[user])

  return userData;
}

export default useUser