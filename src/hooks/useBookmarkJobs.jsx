import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAuth from './useAuth'

const useBookmarkJobs = () => {

    const {user} = useAuth()
    const {data,isPending} = useQuery({
      queryKey: ['bookmark_jobs',user?.email],
      queryFn: async () => {
        const {data} = await axios.get(`http://localhost:5948/bookmark_jobs?email=${user?.email}`)
        return data
      }
    })
    return {data,isPending}
}

export default useBookmarkJobs