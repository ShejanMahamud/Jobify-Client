import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfo from './useUserInfo'

const useAppliedJobs = () => {

const {user} = useUserInfo()

    const {data:appliedJobs = [],isPending} = useQuery({
        queryKey: ['applied_jobs',user?.email],
        queryFn: async () => {
          const {data} = await axios.get(`http://localhost:5948/applied_jobs/${user?.email}`)
          return data
        }
      })
    return {appliedJobs,isPending,appliedJobsCount: appliedJobs.length}
}

export default useAppliedJobs