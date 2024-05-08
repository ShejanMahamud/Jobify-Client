import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5948',
  withCredentials: true,
})

const useAxiosSecure = () => {
  const { logOut } = useAuth() || {}
  const navigate = useNavigate()
  // interceptor

  //   Response Interceptor
  axiosSecure.interceptors.response.use(
    res => {
      return res
    },
    async error => {
      console.log('Error from axios interceptor', error.response)
      if (error.response.status === 401 || error.response.status === 403) {
        await logOut()
        navigate('/login')
      }
      return Promise.reject(error)
    }
  )

  //   Request Interceptor
  //   axios.interceptors.request

  return axiosSecure
}

export default useAxiosSecure