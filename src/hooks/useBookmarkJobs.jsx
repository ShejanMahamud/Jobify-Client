import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfo from './useUserInfo'

const useBookmarkJobs = () => {

    const {user} = useUserInfo()
    const {data:bookmarkJobs=[],isPending} = useQuery({
      queryKey: ['bookmark_jobs',user?.email],
      queryFn: async () => {
        const {data} = await axios.get(`http://localhost:5948/bookmark_jobs?email=${user?.email}`)
        return data
      }
    })
    return {bookmarkJobs,isPending,bookmarkJobsCount: bookmarkJobs.length}
}

export default useBookmarkJobs